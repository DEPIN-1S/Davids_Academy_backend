const model = require('../../model/admin/successStory');
const logger = require('../../utils/logger');
const fs = require('fs');
const path = require('path');

module.exports.CreateSuccessStory = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({
                result: false,
                message: "Image is required"
            });
        }
        let image = req.file.filename;
        let createSuccessStory = await model.CreateSuccessStory(image);
        if (createSuccessStory.affectedRows > 0) {
            logger.info("Success story created successfully", { image });
            return res.status(201).send({
                result: true,
                message: "Success story created successfully"
            });
        } else {
            logger.error("Failed to create success story", { image });
            return fs.unlink(path.join(__dirname, '../../../public/uploads/successimage', image), (err) => {
                if (err) logger.error("Failed to delete uploaded file on error", { image, err });
            });
            return res.status(500).send({
                result: false,
                message: "Failed to create success story, Please try again later."
            });
        }
    } catch (error) {
        logger.error("Error in CreateSuccessStory", { error: error.message });
        if (req.file) {
            fs.unlink(path.join(__dirname, '../../../public/uploads/successimage', req.file.filename), (err) => {
                if (err) logger.error("Failed to delete uploaded file on error", { filename: req.file.filename, err });
            });
        }
        return res.status(500).send({
            result: false,
            message: error.message
        });
    }
};

module.exports.EditSuccessStory = async (req, res) => {
    try {
        const { id } = req.params;
        let image;
        let oldImage = null;

        let checkStory = await model.CheckSuccessStory(id);
        if (checkStory.length === 0) {
            return res.status(404).send({
                result: false,
                message: "Success story not found"
            });
        }

        oldImage = checkStory[0].image;

        if (req.file) {
            // Delete old image if new one uploaded
            const oldPath = path.join(__dirname, '../../../public/uploads/successimage', oldImage);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
                logger.info("Old image deleted during edit", { oldImage });
            }
            image = req.file.filename;
        } else {
            // Allow no-change if no new file (fallback to old)
            image = req.body.existingImage || oldImage;
        }

        if (!image) {
            return res.status(400).send({
                result: false,
                message: "Image is required"
            });
        }

        let editSuccessStory = await model.EditSuccessStory(image, id);
        if (editSuccessStory.affectedRows > 0) {
            logger.info("Success story edited successfully", { id, image });
            return res.send({
                result: true,
                message: "Success story edited successfully"
            });
        } else {
            logger.error("Failed to edit success story", { id, image });
            // Rollback: Restore old file if it was deleted and update failed
            if (req.file && oldImage) {
                // Note: This is simplistic; in prod, you'd need to handle file restoration better
                logger.warn("Rollback attempted for failed edit", { id });
            }
            return res.status(500).send({
                result: false,
                message: "Failed to edit success story, Please try again later."
            });
        }
    } catch (error) {
        logger.error("Error in EditSuccessStory", { error: error.message });
        // Cleanup new file on error
        if (req.file) {
            fs.unlink(path.join(__dirname, '../../../public/uploads/successimage', req.file.filename), (err) => {
                if (err) logger.error("Failed to delete uploaded file on error", { filename: req.file.filename, err });
            });
        }
        return res.status(500).send({
            result: false,
            message: error.message
        });
    }
};

module.exports.DeleteSuccessStory = async (req, res) => {
    try {
        const { id } = req.params;
        let checkStory = await model.CheckSuccessStory(id);
        if (checkStory.length === 0) {
            return res.status(404).send({
                result: false,
                message: "Success story not found"
            });
        }

        const image = checkStory[0].image;
        const imagePath = path.join(__dirname, '../../../public/uploads/successimage', image);
        
        // Delete file from disk
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            logger.info("Image file deleted during story deletion", { image });
        }

        let deleteSuccessStory = await model.DeleteSuccessStory(id);
        if (deleteSuccessStory.affectedRows > 0) {
            logger.info("Success story deleted successfully", { id });
            return res.send({
                result: true,
                message: "Success story deleted successfully"
            });
        } else {
            logger.error("Failed to delete success story", { id });
            // Rollback: If DB delete failed, but file was deleted—issue, but for now log
            logger.error("File deleted but DB rollback needed", { id, image });
            return res.status(500).send({
                result: false,
                message: "Failed to delete success story, Please try again later."
            });
        }
    } catch (error) {
        logger.error("Error in DeleteSuccessStory", { error: error.message });
        return res.status(500).send({
            result: false,
            message: error.message
        });
    }
};

module.exports.GetAllSuccessStories = async (req, res) => {
    try {
        const { limit = 100, offset = 0 } = req.query;  // Use query params for pagination
        const data = await model.GetAllSuccessStories(parseInt(limit), parseInt(offset));
        const count = await model.CountSuccessStories();

        const uploadsDir = path.join(__dirname, '../../public/uploads/successimage');
        const remoteUploadsBase = (
            process.env.PUBLIC_UPLOADS_BASE_URL ||
            (process.env.NODE_ENV === 'local' ? 'https://api.davids-academy.com' : '')
        ).replace(/\/$/, '');

        const validData = data.map(item => {
            const relativeUrl = `/uploads/successimage/${item.image}`;
            const filePath = path.join(uploadsDir, item.image);
            const exists = fs.existsSync(filePath);
            const imageUrl = !exists && remoteUploadsBase
                ? `${remoteUploadsBase}${relativeUrl}`
                : relativeUrl;
            return { id: item.id, image: imageUrl, imageUrl };
        });
        
        logger.info("Student success stories list fetched", { limit, offset, total: count[0].count });
        return res.send({
            result: true,
            data: validData,
            count: count[0].count
        });
    } catch (error) {
        logger.error("Error fetching student success stories", { error: error.message });
        return res.status(500).send({ result: false, message: error.message });
    }
};