const model = require('../../model/student/successStory');
const logger = require('../../utils/logger');

module.exports.GetSuccessStoriesPublic = async (req, res) => {
    try {
        const { limit = 10, offset = 0 } = req.query;
        const parsedLimit = parseInt(limit, 10);
        const parsedOffset = parseInt(offset, 10);
        
        if (isNaN(parsedLimit) || isNaN(parsedOffset) || parsedLimit < 1 || parsedOffset < 0) {
            return res.status(400).send({
                result: false,
                message: "Invalid limit or offset parameters"
            });
        }

        let successStories = await model.GetAllSuccessStories(parsedLimit, parsedOffset);
        let count = await model.CountSuccessStories();
        
        // Optional: Construct full image URLs for frontend (assuming base URL)
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        successStories = successStories.map(story => ({
            ...story,
            imageUrl: `${baseUrl}/public/uploads/successimage/${story.image}`
        }));

        logger.info("Public success stories fetched successfully", { limit: parsedLimit, offset: parsedOffset, total: count[0].count });
        return res.status(200).send({
            result: true,
            data: successStories,
            count: count[0].count,
            pagination: { limit: parsedLimit, offset: parsedOffset }
        });
    } catch (error) {
        logger.error("Error fetching public success stories", { error: error.message });
        return res.status(500).send({
            result: false,
            message: error.message
        });
    }
};