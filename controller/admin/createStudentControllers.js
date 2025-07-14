const model = require('../../model/admin/createStudentModels')
const { HashPassword, ComparePassword } = require('../../utils/bcrypt')
const { GenerateOtp } = require('../../utils/generateOtp')
const { transporter } = require('../../utils/mailer')

module.exports.CreateStudent = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password } = req.body
        if (!firstname || !lastname || !email || !phone || !password) {
            return res.send({
                result: false,
                message: 'First name, last name, email, phone and password are requried'
            })
        }
        let checkEmail = await model.CheckEmail(email)
        if (checkEmail.length > 0) {
            return res.send({
                result: false,
                message: "Email already exist"
            })
        }
        let checkPhone = await model.CheckPhone(phone)
        if (checkPhone.length > 0) {
            return res.send({
                result: false,
                message: "Phone already exist"
            })
        }
        const hashedPassword = await HashPassword(password)
        const otp = GenerateOtp()
        let htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <title>OTP Verification - Davids Academy</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
        body {
            font-family: 'Roboto', sans-serif;
            background: #f0f4f8;
            margin: 0;
            padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
                overflow: hidden;
                }
                .header {
                    background: linear-gradient(90deg, #0062E6, #33AEFF);
                    color: white;
                    padding: 25px;
                    text-align: center;
                    font-size: 24px;
                    font-weight: 500;
                    letter-spacing: 1px;
                    }
                    .content {
                        padding: 35px 30px;
                        text-align: center;
                        }
                        .greeting {
                            font-size: 18px;
                            color: #444;
                            margin-bottom: 12px;
                            }
                            .info {
                                font-size: 16px;
                                color: #666;
                                margin-bottom: 25px;
                                }
                                .otp-code {
                                    display: inline-block;
                                    font-size: 36px;
                                    color: #222;
                                    background: #f2f8ff;
                                    border: 2px dashed #007bff;
                                    padding: 15px 25px;
                                    letter-spacing: 6px;
                                    border-radius: 8px;
                                    font-weight: bold;
                                    margin-bottom: 25px;
                                    }
                                    .note {
                                        font-size: 15px;
                                        color: #777;
                                        margin-top: 20px;
                                        }
                                        .footer {
                                            background: #f9f9f9;
                                            text-align: center;
                                            font-size: 13px;
                                            color: #aaa;
                                            padding: 20px;
                                            border-top: 1px solid #eee;
                                            }
                                            </style>
                                            </head>
                                            <body>
                                            <div class="container">
                                            <div class="header">
                                            Davids Academy - OTP Verification
                                            </div>
                                            <div class="content">
                                            <div class="greeting">Hello! ${firstname} ${lastname}</div>
                                            <div class="info">Use the following One-Time Password (OTP) to complete your verification:</div>
                                            <div class="otp-code">${otp}</div>
                                            <div class="info">This OTP is valid for the next <strong>10 minutes</strong>. Do not share it with anyone.</div>
                                            <div class="note">If you did not request this OTP, you can safely ignore this email.</div>
                                            </div>
                                            <div class="footer">
                                            &copy; 2025 Davids Academy. All rights reserved.
                                            </div>
                                            </div>
                                            </body>
                                            </html>
                                            `
        let createUser = await model.createStudent(firstname, lastname, email, hashedPassword, phone)
        if (createUser.affectedRows > 0) {
            await transporter.sendMail({
                from: "Dr LifeBoat <nocontact@drlifeboat.com>",
                to: email,
                subject: "Email Verification - Davids Academy",
                html: htmlTemplate
            })
            return res.send({
                result: true,
                message: "Registartion successfull, verification code sent to your mail"
            })
        } else {
            return res.send({
                result: false,
                message: "Failed to create user"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}