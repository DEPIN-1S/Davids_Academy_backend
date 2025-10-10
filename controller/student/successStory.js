const model = require('../../model/student/successStory');
const logger = require('../../utils/logger');

module.exports.GetSuccessStoriesPublic = async (req, res) => {
    try {
        const { limit = 10, offset = 0 } = req.query;
        let successStories = await model.GetAllSuccessStories(limit, offset);
        let count = await model.CountSuccessStories();
        logger.info("Public success stories fetched successfully", { limit, offset })
        return res.send({
            result: true,
            data: successStories,
            count: count[0].count,
            message: "Success stories fetched successfully"
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}