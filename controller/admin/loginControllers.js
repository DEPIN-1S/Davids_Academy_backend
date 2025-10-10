const model = require('../../model/admin/loginModels');
const { HashPassword, ComparePassword } = require('../../utils/bcrypt');
const { GenerateOtp } = require('../../utils/generateOtp');
const { transporter, buildOtpTemplate, buildResetOtpTemplate } = require('../../utils/mailer');
const { generateAccessToken, generateRefreshToken } = require('../../utils/token');
const logger = require('../../utils/logger');

/**
 * @desc Register a new user and send OTP via email
 * @route POST /api/user/create
 * @access Public
 */
module.exports.CreateUser = async (req, res) => {
    try {
        const { firstname, lastname, email, mobile, password } = req.body;
        const role = 2; // Default student role
        if (!firstname || !lastname || !email || !mobile || !password) {
            logger.warn("Missing fields in registration");
            return res.send({ result: false, message: 'All fields are required' });
        }
        const checkEmail = await model.checkEmail(email);
        if (checkEmail.length > 0) {
            logger.warn(`Email already registered: ${email}`);
            return res.send({ result: false, message: 'Email already exists' });
        }
        const checkMobile = await model.checkmobile(mobile);
        if (checkMobile.length > 0) {
            logger.warn(`Mobile already registered: ${mobile}`);
            return res.send({ result: false, message: 'Mobile already exists' });
        }
        const hashedPassword = await HashPassword(password);
        const otp = GenerateOtp();
        const createUser = await model.createStudent(firstname, lastname, email, hashedPassword, mobile, role, otp);
        if (createUser.affectedRows > 0) {
            logger.info(`User registered successfully: ${email}`);
            return res.send({ result: true, message: 'Registration successful. ' });
        } else {
            logger.error(`Failed to insert user: ${email}`);
            return res.send({ result: false, message: 'User creation failed' });
        }
    } catch (error) {
        logger.error(`CreateUser error: ${error.message}`);
        return res.send({ result: false, message: error.message });
    }
};
/**
 * @desc Verify user OTP
 */
module.exports.VerifyOtp = async (req, res) => {
    try {
        const { email, otp, password } = req.body;
        if (!email || !otp) {
            return res.send({ result: false, message: 'Email and OTP are required' });
        }

        const user = await model.checkEmail(email);
        if (user.length === 0) {
            logger.warn(`VerifyOtp failed: email not found - ${email}`);
            return res.send({ result: false, message: 'Email not found' });
        }

        if (otp == user[0]?.token) {
            await model.updateToken(email);

            if (password) {
                const hashed = await HashPassword(password);
                await model.updatePassword(email, hashed);
                logger.info(`Password reset for user: ${email}`);
                return res.send({ result: true, message: 'Password reset successful' });
            }

            logger.info(`OTP verified successfully for ${email}`);
            return res.send({ result: true, message: 'OTP verified successfully' });
        }

        logger.warn(`Invalid OTP for ${email}`);
        return res.send({ result: false, message: 'Invalid OTP' });

    } catch (error) {
        logger.error(`VerifyOtp error: ${error.message}`);
        return res.send({ result: false, message: error.message });
    }
};
/**
 * @desc Send OTP for Forgot Password
 */
module.exports.ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.send({ result: false, message: 'Email is required' });
        }

        const user = await model.checkEmail(email);
        if (user.length === 0) {
            logger.warn(`ForgotPassword failed: Email not found - ${email}`);
            return res.send({ result: false, message: 'Email not found' });
        }

        const otp = GenerateOtp();
        await model.updateToken(email, otp); // Update OTP in DB

        await transporter.sendMail({
            from: "Dr LifeBoat <nocontact@drlifeboat.com>",
            to: email,
            subject: "Password Reset - Davids Academy",
            html: buildResetOtpTemplate(user[0]?.firstname, user[0]?.lastname, otp)
        });

        logger.info(`OTP sent for password reset: ${email}`);
        return res.send({ result: true, message: 'OTP sent to email' });

    } catch (error) {
        logger.error(`ForgotPassword error: ${error.message}`);
        return res.send({ result: false, message: error.message });
    }
};
/**
 * @desc User Login
 */
module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({ result: false, message: 'Email and password are required' });
        }

        const user = await model.checkEmail(email);
        if (user.length === 0) {
            logger.warn(`Login failed: email not found - ${email}`);
            return res.send({ result: false, message: 'User not found' });
        }

        if (user[0]?.status === "inactive") {
            return res.send({
                result: false,
                message: "You are blocked by the admin. Please connect with the admin for further information"
            })
        }

        const isMatch = await ComparePassword(password, user[0]?.password);
        if (!isMatch) {
            logger.warn(`Login failed: incorrect password - ${email}`);
            return res.send({ result: false, message: 'Invalid password' });
        }

        const accessToken = generateAccessToken({  // Consider renaming to GenerateJWT
            user_id: user[0]?.id,
            name: user[0]?.firstname + ' ' + user[0]?.lastname,
            email: user[0]?.email,
            mobile: user[0]?.mobile,
            role: user[0]?.role,
            status: user[0]?.status

        });
        const refreshToken = generateRefreshToken({  // Consider renaming to GenerateJWT
            user_id: user[0]?.id,
            name: user[0]?.firstname + ' ' + user[0]?.lastname,
            email: user[0]?.email,
            mobile: user[0]?.mobile,
            role: user[0]?.role,
            status: user[0]?.status
        });

        logger.info(`User logged in: ${email}`);
        return res.send({
            result: true,
            message: 'Login successful',
            data: {
                id: user[0]?.id,
                name: user[0]?.firstname + ' ' + user[0]?.lastname,
                email: user[0]?.email,
                mobile: user[0]?.mobile,
                role: user[0]?.role,
                courseId: user[0]?.target_exam,
                tokenType: 'Bearer',
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        });

    } catch (error) {
        logger.error(`Login error: ${error.message}`);
        return res.send({ result: false, message: error.message });
    }
};



module.exports.AdminResetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            logger.warn("Missing fields in admin reset password request");
            return res.status(400).send({ result: false, message: 'Email and new password are required' });
        }

        const user = await model.checkEmail(email);
        if (user.length === 0) {
            logger.warn(`Admin reset password failed: email not found - ${email}`);
            return res.status(404).send({ result: false, message: 'User not found' });
        }

        const hashedPassword = await HashPassword(newPassword);
        const updateResult = await model.updatePassword(email, hashedPassword);
        if (updateResult.affectedRows > 0) {
            logger.info(`Admin reset password successful for user: ${email} by admin: ${req.user.email}`);
            return res.send({ result: true, message: 'Password reset successful' });
        } else {
            logger.error(`Admin reset password failed for user: ${email}`);
            return res.status(500).send({ result: false, message: 'Failed to reset password' });
        }
    } catch (error) {
        logger.error(`AdminResetPassword error: ${error.message}`);
        return res.status(500).send({ result: false, message: error.message });
    }
};