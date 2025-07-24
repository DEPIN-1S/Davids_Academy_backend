var model = require("../../model/admin/questionTypes");

module.exports.AddExamTypes = async (req, res) => {
    try {
        let { question_type } = req.body
        if (!question_type) {
            return res.send({
                result: false,
                message: "Exam Type name is reqiured",
            })
        }
        let addExamTypes = await model.AddExamTypesQuery(question_type);
        if (addExamTypes.affectedRows > 0) {
            return res.send({
                message: "Exam type added sucessfully",
            })
        } else {

            return res.send({
                result: false,
                message: "Failed to add Exam Type",
            })
        }


    } catch (error) {
        return res.send({
            result: false,
            message: error.message,

        })
    }
}


module.exports.ListExamTypes = async (req, res) => {
    try {

        let ExamTypeslist = await model.ListExamTypesQuery();
        if (ExamTypeslist.length > 0) {
            return res.send({
                message: "data retrived",
                list: ExamTypeslist,

            })
        } else {

            return res.send({
                result: false,
                message: "data not found",
            })
        }


    } catch (error) {
        return res.send({
            result: false,
            message: error.message,

        })
    }
}

module.exports.UpdateExamTypes = async (req, res) => {
    try {
        let { ext_id,question_type } = req.body
        if (!question_type || !ext_id) {
            return res.send({
                result: false,
                message: "Exam Type name and id is reqiured",
            })
        }
        let UpdateExamTypes = await model.UpdateExamTypesQuery(question_type,ext_id);
        if (UpdateExamTypes.affectedRows > 0) {
            return res.send({
                message: "Exam type updated sucessfully",
            })
        } else {
            return res.send({
                result: false,
                message: "Failed to update Exam Type",
            })
        }


    } catch (error) {
        return res.send({
            result: false,
            message: error.message,

        })
    }
}

module.exports.deleteExamTypes = async (req, res) => {
    try {
        let { ext_id } = req.body || {}
        if (!ext_id) {
            return res.send({
                result: false,
                message: "Exam Types id required"
            })
        }
        let ExamTypeslist = await model.delteExamTypesquery(ext_id);
        if (ExamTypeslist.affectedRows > 0) {
            return res.send({
                result: true,
                message: "Exam Type deleted successfully"
            })
        }
        else {
            return res.send({
                result: false,
                message: "Exam Type details not found"
            })
        }



    } catch (error) {
        return res.send({
            result: false,
            message: error.message,

        })
    }


}