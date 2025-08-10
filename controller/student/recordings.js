const model = require('../../model/student/recordings')



module.exports.ListAllRecordings = async (req, res) => {
    try {
        const {
            searchQuery = '',
            page = 1,
            limit = 10,
            courseId,
            subjectId
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

        // Subject filter
        if (subjectId) {
            conditions.push(`r_subject = ?`);
            params.push(subjectId);
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