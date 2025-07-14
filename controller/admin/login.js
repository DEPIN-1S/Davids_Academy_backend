const model = require('../../model/admin/login')
const { HashPassword, ComparePassword } = require('../../util/bcrypt')
const { GenerateOtp } = require('../../util/generateOtp')
const { transporter } = require('../../util/mailer')

module.exports.CreateUser = async (req, res) => {
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
        let createUser = await model.CreateUser(firstname, lastname, email, hashedPassword, phone, otp)
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
module.exports.VerifyOtp = async (req, res) => {
    try {
        let { email, otp, password } = req.body
        if (!email || !otp) {
            return res.send({
                result: false,
                message: "Email and otp are required"
            })
        }
        let checkEmail = await model.CheckEmail(email)
        if (checkEmail.length === 0) {
            return res.send({
                result: false,
                message: "Email not found. Invalid email"
            })
        }
        if (otp == checkEmail[0]?.u_token) {
            // ✅ Clear OTP
            await model.UpdateToken(email);

            // ✅ Optionally update password
            if (password) {
                const hashedPassword = await HashPassword(password); // Make sure it's synchronous or await if it's bcrypt.hash
                await model.UpdatePassword(email, hashedPassword);
                return res.send({
                    result: true,
                    message: "Password reseted successfully"
                })
            }
            return res.send({
                result: true,
                message: "Otp verification successfull"
            })
        } else {
            return res.send({
                result: false,
                message: "Invalid otp"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}
module.exports.ForgotPassword = async (req, res) => {
    try {
        let { email } = req.body
        if (!email) {
            return res.send({
                result: false,
                message: "Email is required"
            })
        }
        let checkEmail = await model.CheckEmail(email)
        if (checkEmail.length === 0) {
            return res.send({
                result: false,
                message: "Email not found."
            })
        }
        const otp = GenerateOtp()
        let htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset - Davids Academy</title>
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
      Davids Academy - Password Reset OTP
    </div>
    <div class="content">
      <div class="greeting">Hello ${checkEmail[0]?.firstname} ${checkEmail[0]?.lastname},</div>
      <div class="info">We received a request to reset your password. Use the following One-Time Password (OTP) to proceed:</div>
      <div class="otp-code">${otp}</div>
      <div class="info">This OTP is valid for the next <strong>10 minutes</strong>. Please do not share it with anyone.</div>
      <div class="note">If you did not request a password reset, please ignore this email or contact support.</div>
    </div>
    <div class="footer">
      &copy; 2025 Davids Academy. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
        await transporter.sendMail({
            from: "Dr LifeBoat <nocontact@drlifeboat.com>",
            to: email,
            subject: "Email Verification - Davids Academy",
            html: htmlTemplate
        })
        return res.send({
            result: true,
            message: "Reset password, verification code sent to your mail"
        })

    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}
module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.send({
                result: false,
                message: "Email and password are required"
            })
        }
        let checkEmail = await model.CheckEmail(email)
        if (checkEmail.length === 0) {
            return res.send({
                result: false,
                message: "User not found. Invalid email"
            })
        }
        let comparePassword = await ComparePassword(password, checkEmail[0]?.u_password)
        if (!comparePassword) {
            return res.send({
                result: false,
                message: "Password mismatch"
            })
        }
        let token = GenerateOtp({
            user_id: checkEmail[0]?.u_id,
            name: checkEmail[0]?.u_firstname + checkEmail[0].u_lastname,
            email: checkEmail[0]?.u_email,
            phone: checkEmail[0]?.u_phone,
            role: checkEmail[0]?.u_role
        })
        return res.send({
            result: true,
            message: "Login successful",
            data: {
                id: checkEmail[0]?.u_id,
                name: checkEmail[0]?.u_firstname + checkEmail[0].u_lastname,
                email: checkEmail[0]?.u_email,
                phone: checkEmail[0]?.u_phone,
                role: checkEmail[0]?.u_role,
                token
            }
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}
