const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: "letsflix360@gmail.com",
        clientId: "582869229993-sep486l73m7h0lbdvgdikuep6lg1h4df.apps.googleusercontent.com",
        clientSecret: "2NavuGUamJCb-MtQbUS3q0ag",
        refreshToken: "1//045QWXDyTRlyeCgYIARAAGAQSNwF-L9IrFykn4KkSYvEQ56TjH3h-7trxBGv5anAhl69rLuajNjfALgh-ZNxrLKaBiknmq7tNdng",
        accessToken: "ya29.a0AfH6SMABo7TsTLS5GifEfqGmUpp5lvaXUiYFwc5MdvnmgnVIW75JWkEoQz3o6Dfx30wBZZsaT77Su0AS9Zc5GXnx4D8Id_1i9T-uWBQKzj5H7KBPnDQurklbDOgy-G2OVtQ-7kU7cOqcLf_1T8v6UmrFgokJpCukxg0"
    }
});

const sendEmail = (mailOptions) => {
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
            return console.log('Error occurs');
        }
        return console.log('Email sent!!!');
    });
}

module.exports = {
    sendEmail
}