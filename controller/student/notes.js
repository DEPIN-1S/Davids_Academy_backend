const logger = require('../../utils/logger');
const model = require('../../model/student/notes')

module.exports.CreateNote = async (req, res) => {
    try {
        const { user_id } = req?.user
        let { title, description } = req.body
        if (!title || !description) {
            return res.send({
                result: false,
                message: "Title and description are required"
            })
        }
        let createNote = await model.CreateNote(title, description, user_id)
        if (createNote.affectedRows > 0) {
            logger.info("Note created successfully", { title, description, user_id })
            return res.send({
                result: true,
                message: "Note created successfullyF"
            })
        } else {
            logger.error("failed to create note", { title, description, user_id })
            return res.send({
                result: false,
                message: "Failed to create note, Please try again later."
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}


module.exports.EditNote = async (req, res) => {
    try {
        const { user_id } = req?.user
        let { note_id, title, description } = req.body
        if (!note_id) {
            return res.send({
                result: false,
                message: "Note id is required"
            })
        }
        let checkNote = await model.CheckNote(note_id, user_id)
        if (checkNote.length === 0) {
            logger.warn("Note not found. Invalid note id", { note_id, user_id })
            return res.send({
                result: false,
                message: "Note not found. Invalid note id"
            })
        }
        let updates = [];

        if (title) {
            updates.push(`n_title='${title}'`);
        }

        if (description) {
            updates.push(`n_description='${description}'`);
        }

        let condition = '';
        if (updates.length > 0) {
            condition = 'SET ' + updates.join(', ');
        }
        if (condition != ``) {
            let updateNote = await model.EditNote(condition, note_id)
            if (updateNote.affectedRows === 0) {
                logger.error("failed to update note", { condition, note_id })
                return res.send({
                    result: false,
                    message: "Failed to create note, Please try again later."
                })
            }
        }
        logger.info("Note updated successfully", { condition, note_id })
        return res.send({
            result: true,
            message: "Note updated successfullyF"
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}


module.exports.ListNotes = async (req, res) => {
    try {
        const { user_id } = req?.user;
        const { filter = 'all', page = 1, limit = 10 } = req.body; // 'today', 'week', 'month', or 'all'
        const offset = (page - 1) * limit;

        let dateCondition = '';
        if (filter === 'today') {
            dateCondition = `AND DATE(n_created_at) = CURDATE()`;
        } else if (filter === 'week') {
            dateCondition = `AND YEARWEEK(n_created_at, 1) = YEARWEEK(CURDATE(), 1)`;
        } else if (filter === 'month') {
            dateCondition = `AND MONTH(n_created_at) = MONTH(CURDATE()) AND YEAR(n_created_at) = YEAR(CURDATE())`;
        }
        logger.info("Listing notes as per the filter", { dateCondition })
        // ✅ Get total count for pagination info
        const countResult = await model.CountNotes(user_id, dateCondition);
        const total = countResult[0]?.count || 0;

        // ✅ Get paginated notes
        const notes = await model.GetNotesByDate(user_id, dateCondition, limit, offset);
        logger.info("Listed notes as per the condition", { notes })

        return res.json({
            result: true,
            message: "Notes listed successfully",
            data: notes,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}


module.exports.DeleteNote = async (req, res) => {
    try {
        const { user_id } = req?.user
        let { note_id } = req.body
        if (!note_id) {
            return res.send({
                result: false,
                message: "Note id is required"
            })
        }
        let checkNote = await model.CheckNote(note_id, user_id)
        if (checkNote.length === 0) {
            logger.warn("Note not found. Invalid note id", { note_id, user_id })
            return res.send({
                result: false,
                message: "Note not found. Invalid note id"
            })
        }
        let deleteNote = await model.DeleteNote(note_id)
        if (deleteNote.affectedRows > 0) {
            logger.info("Note deleted successfully", { note_id, user_id })
            return res.send({ result: true, message: "Note deleted successfully" })
        } else {
            logger.warn("Failed to deleted note", { note_id, user_id })
            return res.send({ result: false, message: "Failed to deleted note" })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}