const jwt = require('jsonwebtoken');
// const adminModel = require('../model/admin/staff')
// const studentModel = require('../model/student/login')

// JWT middleware
const verifyToken = (req, res, next) => {
    let SECRET_KEY = process.env.JWT_SECRET_KEY
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: "No token provided" });
    }
    let token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: "Authentication failed: Invalid token" });
        }
        // if (decoded.role === "admin") {
        //     let admin = await adminModel.CheckWithId(decoded.user_id)
        //     if (!admin || admin.length === 0) {
        //         return res.send({
        //             result: false,
        //             message: "Invalid token, User not found"
        //         })
        //     }
        //     req.user = admin
        //     return
        // }
        // if (decoded.role === "student") {
        //     let student = await studentModel.CheckWithId(decoded.user_id)
        //     if (!student || student.length === 0) {
        //         return res.send({   
        //             result: false,
        //             message: "Invalid token, Student not found"
        //         })
        //     }
        //     req.user = student
        //     return
        // }
        req.user = decoded
        next();
    });
};

module.exports = { verifyToken };
