const model = require('../../model/admin/course');
const logger = require('../../utils/logger');

module.exports.CreateCourse = async (req, res) => {
    try {

        // let Course_id = req.Course.u_id;
        // let role = req.Course.role;

        // // Fetch admin data to check the role
        // var CourseData = await model.getCourseData(Course_id, role);
        // if (CourseData[0]?.u_role === 'Course') {
        //     return res.send({
        //         result: false,
        //         message: "Access Denied, try with an authorized account"
        //     });
        // }
        let { course_name, sub_title, descrption, desc_points } = req.body;

        if (!course_name || !sub_title || !descrption || !desc_points) {
            logger.warn("Missing required course fields", { course_name, sub_title, descrption, desc_points });
            return res.send({
                result: false,
                message: "All fields are required"
            });
        }

        const courseImageFile = req.files?.courseimage?.[0]?.filename;
        const courseImage = courseImageFile ? `/uploads/courses/${courseImageFile}` : null;
        logger.info("Processed course image", { courseImage });

        let addcourse = await model.createCourse(course_name, sub_title, descrption, desc_points, courseImage);

        if (addcourse.affectedRows > 0) {
            logger.info("Course added successfully", { course_name });
            return res.send({
                result: true,
                message: "Sucessfully added course details"
            });
        } else {
            logger.warn("Failed to insert course in DB", { course_name });
            return res.send({
                result: false,
                message: "Failed to add course deatails"
            });
        }
    } catch (error) {
        logger.error("Error in CreateCourse", { error: error.message });
        return res.send({
            result: false,
            message: error.message
        });
    }
}

module.exports.ListCourses = async (req, res) => {
    try {
        let { cs_id } = req.query || {};

        var condition = "";
        if (cs_id) {
            condition = `where cs_id ='${cs_id}' `;
            logger.info("Applying filter in ListCourses", { condition });
        }

        let ListCourses = await model.ListCoursesQuerry(condition);

        if (ListCourses.length > 0) {
            logger.info("Courses retrieved", { count: ListCourses.length });
            return res.send({
                result: true,
                message: "data retrieved",
                list: ListCourses
            });
        } else {
            logger.warn("No courses found", { cs_id });
            return res.send({
                result: false,
                message: "data not found",
            });
        }

    } catch (error) {
        logger.error("Error in ListCourses", { error: error.message });
        return res.send({
            result: false,
            message: error.message,
        });
    }
}


module.exports.DeleteCourses = async (req, res) => {
    try {
        let { cs_id } = req.params;

        if (!cs_id) {
            logger.warn("Course id is missing", { cs_id });
            return res.send({
                result: false,
                message: "Course id is required",
            });
        }

        let CheckCourse = await model.CheckCourseQuery(cs_id);

        if (CheckCourse.length > 0) {

            let deleteCourse = await model.DeleteCourseQuery(cs_id)
            if (deleteCourse.affectedRows > 0) {
                logger.warn("sucessfully delete course", { cs_id });

                return res.send({
                    result: true,
                    message: "Course deleted sucessfully",
                });
            } else {
                logger.warn("failed to delete course", { cs_id });

            }

        } else {
            logger.warn("No course details found", { cs_id });
            return res.send({
                result: false,
                message: "course details not found",
            });
        }

    } catch (error) {
        logger.error("Error in DeleteCourse", { error: error.message });
        return res.send({
            result: false,
            message: error.message,
        });
    }
}

module.exports.UpdateCourse = async (req, res) => {
    try {

        let { cs_id, cs_name, cs_sub_title, cs_description, cs_desc_points } = req.body;

        if (!cs_id) {
            logger.warn("Course ID is missing in request");
            return res.send({
                result: false,
                messaage: "Course id is required"
            });
        }

        let courseImage = '';
        console.log("files :", req.files?.courseimage?.[0], req.files?.courseimage);

        if (req.files?.courseimage?.[0]) {
            const courseImageFile = req.files.courseimage[0].filename;
            courseImage = `/uploads/courses/${courseImageFile}`;
            logger.info("Processed new course image", { courseImage });
        }

        const checkCourse = await model.CheckCourseQuery(cs_id);
        logger.info("Course existence check result", { cs_id, exists: checkCourse.length > 0 });

        if (checkCourse.length > 0) {
            let condition = "";

            if (cs_name) {
                condition += condition === '' ? `set cs_name='${cs_name}'` : `, cs_name='${cs_name}'`;
            }
            if (cs_sub_title) {
                condition += condition === '' ? `set cs_sub_title='${cs_sub_title}'` : `, cs_sub_title='${cs_sub_title}'`;
            }
            if (cs_description) {
                condition += condition === '' ? `set cs_description='${cs_description}'` : `, cs_description='${cs_description}'`;
            }
            if (cs_desc_points) {
                condition += condition === '' ? `set cs_desc_points='${cs_desc_points}'` : `, cs_desc_points='${cs_desc_points}'`;
            }
            if (courseImage) {
                condition += condition === '' ? `set cs_image='${courseImage}'` : `, cs_image='${courseImage}'`;
            }

            if (condition !== '') {
                logger.info("Update condition built", { condition });
                const EditCourse = await model.ChangeCourseInfo(condition, cs_id);

                if (EditCourse.affectedRows > 0) {
                    logger.info("Course updated successfully", { cs_id });
                    return res.send({
                        result: true,
                        message: "Course updated successfully"
                    });
                } else {
                    logger.warn("Update failed in DB", { cs_id });
                    return res.send({
                        result: false,
                        message: "Failed to update course"
                    });
                }
            } else {
                logger.warn("No valid fields provided for update", { cs_id });
                return res.send({
                    result: false,
                    message: "No data provided to update"
                });
            }
        } else {
            logger.warn("Course not found in database", { cs_id });
            return res.send({
                result: false,
                message: "Course not found"
            });
        }

    } catch (error) {
        logger.error("Error in UpdateCourse", { error: error.message });
        return res.send({
            result: false,
            message: error.message
        });
    }
}
