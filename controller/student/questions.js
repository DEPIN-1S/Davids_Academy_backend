const model = require('../../model/student/questions')
const logger = require('../../utils/logger');



module.exports.ListQuestionsFromQBank = async (req, res) => {
    try {
        const { user_id } = req?.user
        const studentData = await model.GetStudentData(user_id)
        if (studentData.length == 0) {
            logger.error("Student not found.Please login again", user_id)
            return res.send({
                result: false,
                message: "Student not found.Please login again"
            })
        }
        const courseId = studentData[0]?.target_exam
        const questionData = await model.ListQuestionIds(courseId)
        const questions = questionData.map(item => item.id)
        logger.info("Question ids listed successfully", user_id, courseId)
        return res.send({
            result: true,
            message: "Question ids listed successfully",
            data: questions
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}


module.exports.GetQuestionDataFromQBank = async (req, res) => {
    try {
        const { user_id } = req?.user
        const studentData = await model.GetStudentData(user_id)
        if (studentData.length == 0) {
            logger.error("Student not found.Please login again", user_id)
            return res.send({
                result: false,
                message: "Student not found.Please login again"
            })
        }
        const { questionId } = req.body || {}
        if (!questionId) {
            return res.send({
                result: false,
                message: "Question id is required"
            })
        }
        const checkQuestion = await model.CheckQuestion(questionId)
        if (checkQuestion.length === 0) {
            logger.error("Question not found. Invalid question id", questionId)
            return res.send({
                result: false,
                message: "Question not found. Invalid question id"
            })
        }
        const questionData = await model.GetQuestionData(questionId)
        let fullQuestionData = null
        if (questionData[0]?.question_type.toLowerCase() === "mcq") {
            const mcqoptions = await model.Getmcqoption(questionId);
            const additionalInfo = await model.GetAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId)
            fullQuestionData = {
                ...questionData[0],
                mcqoptions,
                additionalInfo,
                explanation
            };
        }
        if (questionData[0]?.question_type.toLowerCase() === "dropdown") {
            let dropdownTexts = await model.Getdropdownquestiontext(questionId);
            let dropdownquestiontext = await Promise.all(
                dropdownTexts.map(async (item) => {
                    item.dropdownoption = await model.Getdropdownoption(item.id);
                    return item;
                })
            );
            let tabsInfo = await model.Gettabs(questionId);
            let additionalInfo = await model.getAdditionalInfo(questionId);
            let explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                dropdownTexts,
                dropdownquestiontext,
                tabsInfo,
                additionalInfo,
                explanation
            };
        }

        if (questionData[0]?.question_type.toLowerCase() === "sorting") {
            const sortingoptions = await model.Getsortingoption(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                sortingoptions,
                additionalInfo,
                explanation
            };
        }

        if (questionData[0]?.question_type.toLowerCase() === "sentence highlight") {
            const highlightOptions = await model.GetHighlightOptions(questionId);
            const tabsInfo = await model.Gettabs(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                highlightOptions,
                tabsInfo,
                additionalInfo,
                explanation
            };
        }

        if (questionData[0]?.question_type.toLowerCase() === "fill in the blanks") {
            const filltheblankstext = await model.GetFilltheblankstext(questionId);
            const filltheblanksoptions = await model.GetFilltheblankstextOptions(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                filltheblankstext,
                filltheblanksoptions,
                additionalInfo,
                explanation
            };
        };

        if (questionData[0]?.question_type.toLowerCase() === "drag drop") {
            const headings = await model.GetDragDropQuestionsheading(questionId);
            const dropdownquestiontext = await Promise.all(
                headings.map(async (item) => {
                    item.dragdropoption = await model.GetDragDropoption(item.id);
                    return item;
                })
            );
            const tabsInfo = await model.Gettabs(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                headings,
                dropdownquestiontext,
                tabsInfo,
                additionalInfo,
                explanation
            };
        };
        if (questionData[0]?.question_type.toLowerCase() === "multiple radio") {
            const clientfindings = await model.GetMultipleRadioQuestionsClientfindings(questionId);
            const radioOption = await model.GetMultipleRadioQuestionsRadioOption(questionId);
            const tabsInfo = await model.Gettabs(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                clientfindings,
                radioOption,
                tabsInfo,
                additionalInfo,
                explanation
            };
        }

        return res.send({
            result: true,
            message: "Question data retrived successfuly",
            data: fullQuestionData
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}