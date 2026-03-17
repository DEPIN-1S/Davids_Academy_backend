const { InsertTopic, ListTopicsByCourse, DeleteTopic, UpdateTopic } = require('../../model/admin/topicModels');
const logger = require('../../utils/logger');

exports.CreateTopic = async (req, res) => {
    try {
        const { course_id, topic_name } = req.body;
        if (!course_id || !topic_name) {
            return res.status(400).json({ success: false, message: 'course_id and topic_name are required' });
        }
        
        const result = await InsertTopic(course_id, topic_name);
        if (result.success) {
            return res.status(200).json({ success: true, message: 'Topic created successfully', insertId: result.insertId });
        } else {
            return res.status(500).json({ success: false, message: 'Failed to create topic', error: result.error });
        }
    } catch (error) {
        logger.error(`[CreateTopicController] Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.GetTopics = async (req, res) => {
    try {
        const { course_id } = req.query;
        if (!course_id) {
            return res.status(400).json({ success: false, message: 'course_id is required' });
        }
        
        const result = await ListTopicsByCourse(course_id);
        if (result.success) {
            return res.status(200).json({ success: true, message: 'Topics fetched successfully', topics: result.topics });
        } else {
            return res.status(500).json({ success: false, message: 'Failed to fetch topics', error: result.error });
        }
    } catch (error) {
        logger.error(`[GetTopicsController] Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.RemoveTopic = async (req, res) => {
    try {
        const { topic_id } = req.query; // using query params or params
        if (!topic_id) {
            return res.status(400).json({ success: false, message: 'topic_id is required' });
        }
        
        const result = await DeleteTopic(topic_id);
        if (result.success) {
            return res.status(200).json({ success: true, message: 'Topic deleted successfully' });
        } else {
            return res.status(500).json({ success: false, message: 'Failed to delete topic', error: result.error });
        }
    } catch (error) {
        logger.error(`[RemoveTopicController] Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.EditTopic = async (req, res) => {
    try {
        const { topic_id, topic_name } = req.body;
        if (!topic_id || !topic_name) {
            return res.status(400).json({ success: false, message: 'topic_id and topic_name are required' });
        }
        
        const result = await UpdateTopic(topic_id, topic_name);
        if (result.success) {
            return res.status(200).json({ success: true, message: 'Topic updated successfully' });
        } else {
            return res.status(500).json({ success: false, message: 'Failed to update topic', error: result.error });
        }
    } catch (error) {
        logger.error(`[EditTopicController] Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
