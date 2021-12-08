const nodemailer = require("nodemailer")

const sendEmail = async(options) => { 
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "akashs.mobigic@gmail.com",
            pass:"MobiJack&12#"
        }
    })
    const mailOptions = {
        from: "akashs.mobigic@gmail.com",
        to: options.mail,
        subject: options.subject,
        text:options.text
    }
    await transporter.sendMail(mailOptions)
}
module.exports = sendEmail