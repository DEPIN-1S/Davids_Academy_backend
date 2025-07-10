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