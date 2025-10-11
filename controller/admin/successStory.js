const model = require('../../model/admin/successStory');
const logger = require('../../utils/logger');


module.exports.CreateSuccessStory = async (req, res) => {
    try {
        if (!req.file) {
            return res.send({
                result: false,
                message: "Image is required"
            })
        }
        let image = req.file.filename;
        let createSuccessStory = await model.CreateSuccessStory(image)
        if (createSuccessStory.affectedRows > 0) {
            logger.info("Success story created successfully", { image })
            return res.send({
                result: true,
                message: "Success story created successfully"
            })
        } else {
            logger.error("failed to create success story", { image })
            return res.send({
                result: false,
                message: "Failed to create success story, Please try again later."
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}

module.exports.EditSuccessStory = async (req, res) => {
    try {
        const { id } = req.params;
        let image = req.body.image; // fallback if no file
        if (req.file) {
            image = req.file.filename;
        }
        if (!image) {
            return res.send({
                result: false,
                message: "Image is required"
            })
        }
        let checkStory = await model.CheckSuccessStory(id);
        if (checkStory.length === 0) {
            return res.send({
                result: false,
                message: "Success story not found"
            })
        }
        let editSuccessStory = await model.EditSuccessStory(image, id)
        if (editSuccessStory.affectedRows > 0) {
            logger.info("Success story edited successfully", { id, image })
            return res.send({
                result: true,
                message: "Success story edited successfully"
            })
        } else {
            logger.error("failed to edit success story", { id, image })
            return res.send({
                result: false,
                message: "Failed to edit success story, Please try again later."
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}

module.exports.DeleteSuccessStory = async (req, res) => {
    try {
        const { id } = req.params;
        let checkStory = await model.CheckSuccessStory(id);
        if (checkStory.length === 0) {
            return res.send({
                result: false,
                message: "Success story not found"
            })
        }
        let deleteSuccessStory = await model.DeleteSuccessStory(id)
        if (deleteSuccessStory.affectedRows > 0) {
            logger.info("Success story deleted successfully", { id })
            return res.send({
                result: true,
                message: "Success story deleted successfully"
            })
        } else {
            logger.error("failed to delete success story", { id })
            return res.send({
                result: false,
                message: "Failed to delete success story, Please try again later."
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}

