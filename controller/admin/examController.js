const { validationResult } = require('express-validator');
const model = require('../../model/admin/examModel')
module.exports.postExamType = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                result: false,
                errors: errors.array().map(err => err.msg),
            });
        }
        const { ExamType } = req.body;
        // Call your model to update the exam type
        const result = await model.insertExamType(userId, ExamType);
        if (result.affectedRows === 0) {
            return res.status(500).json({
                result: false,
                message: "Failed to add ExamType in the database",
            });
        }
        return res.status(200).json({
            result: true,
            message: "Exam type saved successfully",
        });

    } catch (error) {
        return res.status(500).json({
            result: false,
            message: error.message,
        });
    }
};
