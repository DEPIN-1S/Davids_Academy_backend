var model = require('../model/contactus')
var nodemailer = require("nodemailer");
const logger = require('../utils/logger');

module.exports.ContactUs = async (req, res) => {
    try {
        var { name, email, phone, course_interested, message } = req.body;
        if (!name || !email || !phone || !course_interested) {
            return res.send({
                result: false,
                message: "Name, email, phone and course interested are required",
            });
        }
        if (message) {
            var usermessage = message;

        } else {
            var usermessage = "no message";
        }
        let addcontactdetails = await model.AddcContactDetailsquery(name, email, phone, course_interested, usermessage);

        let courseName = "Not Specified";
        try {
            const fetchedCourseName = await model.GetCourseNameById(course_interested);
            if (fetchedCourseName) {
                courseName = fetchedCourseName;
            }
        } catch (err) {
            logger.error('Error fetching course name for email: %o', err);
        }

        const smtpPort = parseInt(process.env.SMTP_PORT || 587);
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
                type: 'custom',
                method: 'PLAIN',
                user: process.env.SMTP_USER ,
                pass: process.env.SMTP_PASS ,
            },
        });
       
        let data = [{
            email: email,
            subject: "MESSAGE FROM DAVIDS ACADEMY",
            text: `Dear ${name},\n\nThank you for contacting us. We appreciate your message and will get back to you as soon as possible. Your feedback is important to us!\n\nThank you!\nThe DAVIDS ACADEMY Team`,
            html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Us</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: auto;
            }
            h1 {
                color: #333;
            }
            p {
                color: #555;
            }
            .button {
                background-color: #007bff;
                color: white;
                padding: 10px 15px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
                margin-top: 20px;
            }
            .button:hover {
                background-color: #0056b3;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 0.9em;
                color: #555;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Thank You for Contacting Us!</h1>
            <p>Dear ${name}</p>
            <p>We appreciate your message and will get back to you as soon as possible. Your feedback is important to us!</p>


            <div class="footer">
                <p>Thank you!</p>
                <p>The DAVIDS ACADEMY Team</p>
            </div>
        </div>
    </body>
    </html>
    `
        },
        {
            // email: 'anoopjosecj@gmail.com',
             email: 'sdepin4@gmail.com',
            subject: `New Enquiry From : ${name}`,
            text: `New Contact Us Submission\n\nYou have received a new message from the contact form on the website.\n\nUser Details:\nName: ${name}\nEmail: ${email}\nPhone Number: ${phone}\nCourse Interested: ${courseName}\nMessage:\n${usermessage}\n\nThank you for your attention!\nThe DAVIDS ACADEMY Team`,
            html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Us Submission</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: auto;
            }
            h1 {
                color: #333;
            }
            p {
                color: #555;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 0.9em;
                color: #555;
            }
            .highlight {
                background-color: #e9ecef;
                padding: 10px;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>New Contact Us Submission</h1>
            <p>You have received a new message from the contact form from the website.</p>

            <h2>User Details:</h2>
            <div class="highlight">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone Number:</strong> ${phone}</p>
                <p><strong>Course Interested:</strong> ${courseName}</p>
                <p><strong>Message:</strong></p>
                <p>${usermessage}</p>
            </div>

            <div class="footer">
                <p>Thank you for your attention!</p>
                <p>The DAVIDS ACADEMY Team</p>
            </div>
        </div>
    </body>
    </html>
    `
        }]

        data.forEach(async (el) => {
            let infos = await transporter.sendMail({
                from: `DAVIDS ACADEMY <${process.env.SMTP_USER || 'enquiries.davidsacademy@gmail.com'}>`,
                to: el.email,
                subject: el.subject,
                text: el.text,
                html: el.html
            });
            nodemailer.getTestMessageUrl(infos);

        });

        if (addcontactdetails.affectedRows > 0) {
            return res.send({
                status: true,
                message: "Mail sent successfully. The team will contact you soon",
            });
        } else {
            return res.send({ result: false, message: "Failed to send contact. Please try again later" })
        }
    } catch (error) {
        logger.error('Student contact us error: %o', error);
        return res.send({
            result: false,
            message: error.message
        })
    }
};


module.exports.ListContacts = async (req, res) => {
    try {
        let listcontactus = await model.ListContactUsQuery();
        if (listcontactus.length > 0) {
            return res.send({
                result: true,
                message: "Data retrived",
                list: listcontactus
            });
        } else {
            return res.send({
                result: false,
                message: "data not found",
            });
        }
    } catch (error) {
        logger.error('Admin list contact as error: %o', error);
        return res.send({
            result: false,
            message: error.message,
        });
    }
}


module.exports.UpdateStatus = async (req, res) => {
    try {
        const { contact_us_id, status } = req.body
        if (!contact_us_id || !["done", "inactive"].includes(status)) {
            return res.send({
                result: false,
                message: "Contact us id and status are required and status should be one of 'done' / 'inactive'"
            })
        }
        const checkContactData = await model.CheckContactData(contact_us_id)
        if (checkContactData.length === 0) {
            logger.error('Contact us data not found in db: %s', contact_us_id);
            return res.send({
                result: false,
                message: "Contact us data not found. Invalid contact us id"
            })
        }
        const updateStatus = await model.UpdateContactUsStatus(contact_us_id, status)
        if (updateStatus.affectedRows > 0) {
            logger.info('Contact us status updated successfuly: %s', contact_us_id);
            return res.send({
                result: true,
                message: "Contact us status updated successfuly"
            })
        } else {
            logger.error('Failed to update contact us status: %s', contact_us_id);
            return res.send({
                result: false,
                message: "Failed to update contact us status"
            })
        }
    } catch (error) {
        logger.error('Mark as done error: %o', error);
        return res.send({
            result: false,
            message: error.message
        })
    }
}