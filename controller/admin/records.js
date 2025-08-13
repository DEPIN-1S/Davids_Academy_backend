const model = require('../../model/admin/records')
const logger = require('../../utils/logger');


module.exports.InsertRecord = async (req, res) => {
    try {
        let { title, course, duration, tutor_name, video_url } = req.body;
        if (!title || !course || !duration || !tutor_name || !video_url) {
            logger.warn("Missing required course fields", { title, course, duration, tutor_name, video_url });
            return res.send({
                result: false,
                message: "Title,course,duration,tutor name and video url are required fields are required"
            });
        }
        const thumbnailFile = req.files?.recordimage?.[0]?.filename;
        const thumbnailImage = thumbnailFile ? `/uploads/courses/${thumbnailFile}` : null;
        logger.info("Processed course image", { thumbnailImage });

        const recordInsert = await model.InsertRecordings(title, thumbnailImage, course, duration, tutor_name, video_url)
        if (recordInsert.affectedRows > 0) {
            logger.info("Record inserted successfully", { recordInsert });
            return res.send({
                result: true,
                message: "Record inserted successfully"
            })
        } else {
            logger.error("Failed to insert recordings", { title, thumbnailImage, course, duration, tutor_name, video_url })
            return res.send({
                result: false,
                message: "Failed to insert recordings"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}


module.exports.EditRecordings = async (req, res) => {
    try {
        let { recording_id, title, course, duration, tutor_name, video_url } = req.body;
        if (!recording_id) {
            logger.warn("Missing required course fields", { recording_id });
            return res.send({
                result: false,
                message: "Recording id is required"
            });
        }
        const checkRecording = await model.CheckRecording(recording_id)
        if (checkRecording.length === 0) {
            logger.error("Recording data not found.", { recording_id });
            return res.send({
                result: false,
                message: "Recording data not found."
            })
        }

        const thumbnailFile = req.files?.recordimage?.[0]?.filename;
        const thumbnailImage = thumbnailFile ? `/uploads/courses/${thumbnailFile}` : null;
        logger.info("Processed course image", { thumbnailImage });
        // Dynamically build update fields
        const fields = [];
        const values = [];

        if (title) {
            fields.push('r_title = ?');
            values.push(title);
        }

        if (course) {
            fields.push('r_course = ?');
            values.push(course);
        }

        if (duration) {
            fields.push('r_duration = ?');
            values.push(duration);
        }

        if (tutor_name) {
            fields.push('r_tutor_name = ?');
            values.push(tutor_name);
        }

        if (video_url) {
            fields.push('r_video_url = ?');
            values.push(video_url);
        }

        if (thumbnailFile) {
            fields.push('r_thumbnail = ?');
            values.push(thumbnailImage);
        }
        // Finalize query
        const setClause = fields.join(', ');
        values.push(recording_id); // for WHERE clause

        if (fields.length > 0) {
            const recordEdit = await model.EditRecordings(setClause, values)
            if (recordEdit.affectedRows > 0) {
                logger.info("Record updated successfully", { recordEdit });
                return res.send({
                    result: true,
                    message: "Record updated successfully"
                })
            } else {
                logger.error("Failed to update recordings", { recording_id });
                return res.send({
                    result: false,
                    message: "Failed to update recordings"
                })
            }
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}


module.exports.ListAllRecordings = async (req, res) => {
    try {
        const {
            searchQuery = '',
            page = 1,
            limit = 10,
            courseId,
        } = req.body || {};

        let conditions = [];
        let params = [];

        // Search filter
        if (searchQuery.trim()) {
            conditions.push(`(r_title LIKE ? OR r_tutor_name LIKE ?)`);
            const term = `%${searchQuery.trim()}%`;
            params.push(term, term);
        }

        // Course filter
        if (courseId) {
            conditions.push(`r_course = ?`);
            params.push(courseId);
        }

        const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

        // Clone params for count query (without limit/offset)
        const countParams = [...params];

        // Pagination
        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);
        const offset = (parsedPage - 1) * parsedLimit;

        // Add limit & offset to main query
        params.push(parsedLimit, offset);

        // Fetch data and count
        const allRecording = await model.ListRecordings(whereClause, params);
        const totalCountRow = await model.CountRecordings(whereClause, countParams);
        const totalCount = totalCountRow?.[0]?.total || 0;

        logger.info(`Recordings listed successfully: where=${whereClause}, params=${JSON.stringify(params)}`);

        return res.send({
            result: true,
            message: "Recordings listed successfully",
            data: allRecording,
            pagination: {
                total: totalCount,
                page: parsedPage,
                limit: parsedLimit,
                totalPages: Math.ceil(totalCount / parsedLimit)
            }
        });
    } catch (error) {
        logger.error(`Error listing recordings: ${error.message}`);
        return res.send({
            result: false,
            message: "Failed to list recordings",
            error: error.message
        });
    }
};


module.exports.DeleteRecordings = async (req, res) => {
    try {
        const { recording_id } = req.body;

        // Validate input
        if (!recording_id) {
            return res.send({
                result: false,
                message: "Recording ID is required"
            });
        }

        // Check if recording exists
        const checkRecording = await model.CheckRecording(recording_id);
        if (!checkRecording || checkRecording.length === 0) {
            return res.send({
                result: false,
                message: "Recording not found"
            });
        }

        // Attempt deletion
        const deleted = await model.DeleteRecording(recording_id);
        if (deleted.affectedRows > 0) {
            logger.info(`Recording deleted: ID ${recording_id}`);
            return res.send({
                result: true,
                message: "Recording deleted successfully"
            });
        } else {
            logger.warn(`Failed to delete recording: ID ${recording_id}`);
            return res.send({
                result: false,
                message: "Failed to delete the recording"
            });
        }

    } catch (error) {
        logger.error(`Error deleting recording [ID ${req.body?.recording_id}]: ${error.message}`);
        return res.send({
            result: false,
            message: "An error occurred while deleting the recording",
            error: error.message
        });
    }
};
