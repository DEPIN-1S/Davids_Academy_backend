let nodemailer = require('nodemailer')


module.exports.transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    auth: {
        type: 'custom',
        method: 'PLAIN',
        user: 'nocontact@drlifeboat.com',
        pass: 'DLboat@123',
    },
    // logger: true,
    // debug: true
});


module.exports.buildOtpTemplate = (firstname, lastname, otp) => {
    return `
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
}


module.exports.buildResetOtpTemplate = (firstname, lastname, otp) => {
    return `
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
      <div class="greeting">Hello ${firstname} ${lastname},</div>
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
`}