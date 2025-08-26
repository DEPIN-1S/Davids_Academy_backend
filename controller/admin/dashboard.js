const model = require('../../model/admin/dashboard');
const logger = require('../../utils/logger');
const { calculateGrowth } = require('../../utils/dashboard');

module.exports.GetDashboard = async (req, res) => {
    try {
        logger.info("[GetDashboard] 📊 Fetching dashboard data...");

        // 1. Students growth
        const studentData = await model.ListAllStudentsWithGrowth();
        logger.info(`[GetDashboard] ✅ Retrieved student growth data: ${JSON.stringify(studentData)}`);
        const studentGrowth = calculateGrowth(studentData);

        // 2. Courses
        const courseData = await model.ListAllCourses();
        logger.info(`[GetDashboard] ✅ Retrieved courses count: ${courseData.length}`);

        // 3. Tests growth
        const testData = await model.ListTestGrowth();
        logger.info(`[GetDashboard] ✅ Retrieved test growth data: ${JSON.stringify(testData)}`);
        const testGrowth = calculateGrowth(testData);

        // 4. Last 5 enquiries
        const enquiryData = await model.ListLast5Enquiries();
        logger.info(`[GetDashboard] ✅ Retrieved last 5 enquiries: ${enquiryData.length}`);

        // 5. Top performing batches/courses
        const topPerformingCourses = await model.ListTopPerformingCourses();
        logger.info(`[GetDashboard] ✅ Retrieved top performing courses: ${topPerformingCourses.length}`);

        // ✅ Success response
        return res.status(200).send({
            result: true,
            message: "Dashboard data retrieved successfully",
            data: {
                students: studentGrowth,
                courses: { total_count: courseData.length },
                tests: testGrowth,
                enquiries: enquiryData,
                topPerformingCourses
            }
        });

    } catch (error) {
        logger.error(`[GetDashboard] ❌ Error fetching dashboard data: ${error.message}`);
        return res.status(500).send({
            result: false,
            message: "Failed to fetch dashboard data",
            error: error.message
        });
    }
};
