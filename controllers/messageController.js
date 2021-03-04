require('dotenv').config()
const Message = require("../models/Message");
const MessageRoom = require("../models/MessageRoom");
const routeName = `message`;
const {
    sendEmail
} = require("../utils/emailSender");

const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find()
            .populate('author')
            .populate('room')
            .exec();

        return res.json({
            status: 200,
            success: true,
            data: messages,
            count: messages.length
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getMessageByID = async (req, res) => {
    try {
        const {
            messageID
        } = req.params;
        const message = await Message.findById(messageID)
            .populate('author')
            .populate('room')
            .exec();

        return res.json({
            status: 200,
            success: true,
            data: message
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getMessageByUserID = async (req, res) => {
    try {
        const {
            userID
        } = req.params;
        const messages = await Message.find({
                author: userID
            })
            .populate('author')
            .populate('room')
            .exec();

        return res.json({
            status: 200,
            success: true,
            data: messages,
            count: messages.length
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getMessageByRoomID = async (req, res) => {
    try {
        const {
            roomID
        } = req.params;
        const messages = await Message.find({
                room: roomID
            })
            .populate('author')
            .populate('room')
            .exec();

        return res.json({
            status: 200,
            success: true,
            data: messages,
            count: messages.length
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const addMessage = async (req, res) => {
    try {
        const {
            author,
            content,
            room
        } = req.body;

        let existedMessageRoom = await MessageRoom.findById(room);

        if (!existedMessageRoom) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `The message room does not exist`
            })
        }

        let message = await new Message({
            author,
            content,
            room,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();
        message = await Message.findById(message._id)
            .populate('author')
            .populate('room')
            .exec();
        let messageRoom = await MessageRoom.findById(room)
            .populate('sender')
            .populate('receiver')
            .exec();

        sendChatNotificationEmail(req, messageRoom);

        return res.json({
            status: 200,
            success: true,
            data: message,
            message: `Successfully created a ${routeName}`
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const sendChatNotificationEmail = (req, messageRoom) => {
    const {
        author,
        content
    } = req.body;

    let isSender = false;

    if (author == messageRoom.sender._id) {
        isSender = true;
    }

    const chatLink = `${process.env.CLIENT_URL}/chat-room/senderID/${messageRoom.sender._id}/receiverID/${messageRoom.receiver._id}`;

    const receiverSideEmail = isSender ? messageRoom.receiver.email : messageRoom.sender.email;
    const senderSideEmail = isSender ? messageRoom.sender.email : messageRoom.receiver.email;

    console.log({
        receiverSideEmail,
        senderSideEmail
    })

    let mailOptions = {
        from: 'letsflix360@gmail.com', // TODO: email sender
        to: receiverSideEmail, // TODO: email receiver
        subject: "UoG Chat Notification",
        html: `
            <!doctype html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Simple Transactional Email</title>
                <style>
                /* -------------------------------------
                    GLOBAL RESETS
                ------------------------------------- */
                
                /*All the styling goes here*/
                
                img {
                    border: none;
                    -ms-interpolation-mode: bicubic;
                    max-width: 100%; 
                }
            
                body {
                    background-color: #f6f6f6;
                    font-family: sans-serif;
                    -webkit-font-smoothing: antialiased;
                    font-size: 14px;
                    line-height: 1.4;
                    margin: 0;
                    padding: 0;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%; 
                }
            
                table {
                    border-collapse: separate;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    width: 100%; }
                    table td {
                    font-family: sans-serif;
                    font-size: 14px;
                    vertical-align: top; 
                }
            
                /* -------------------------------------
                    BODY & CONTAINER
                ------------------------------------- */
            
                .body {
                    background-color: #f6f6f6;
                    width: 100%; 
                }
            
                /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
                .container {
                    display: block;
                    margin: 0 auto !important;
                    /* makes it centered */
                    max-width: 580px;
                    padding: 10px;
                    width: 580px; 
                }
            
                /* This should also be a block element, so that it will fill 100% of the .container */
                .content {
                    box-sizing: border-box;
                    display: block;
                    margin: 0 auto;
                    max-width: 580px;
                    padding: 10px; 
                }
            
                /* -------------------------------------
                    HEADER, FOOTER, MAIN
                ------------------------------------- */
                .main {
                    background: #ffffff;
                    border-radius: 3px;
                    width: 100%; 
                }
            
                .wrapper {
                    box-sizing: border-box;
                    padding: 20px; 
                }
            
                .content-block {
                    padding-bottom: 10px;
                    padding-top: 10px;
                }
            
                .footer {
                    clear: both;
                    margin-top: 10px;
                    text-align: center;
                    width: 100%; 
                }
                    .footer td,
                    .footer p,
                    .footer span,
                    .footer a {
                    color: #999999;
                    font-size: 12px;
                    text-align: center; 
                }
            
                /* -------------------------------------
                    TYPOGRAPHY
                ------------------------------------- */
                h1,
                h2,
                h3,
                h4 {
                    color: #000000;
                    font-family: sans-serif;
                    font-weight: 400;
                    line-height: 1.4;
                    margin: 0;
                    margin-bottom: 30px; 
                }
            
                h1 {
                    font-size: 35px;
                    font-weight: 300;
                    text-align: center;
                    text-transform: capitalize; 
                }
            
                p,
                ul,
                ol {
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: normal;
                    margin: 0;
                    margin-bottom: 15px; 
                }
                    p li,
                    ul li,
                    ol li {
                    list-style-position: inside;
                    margin-left: 5px; 
                }
            
                a {
                    color: #3498db;
                    text-decoration: underline; 
                }
            
                /* -------------------------------------
                    BUTTONS
                ------------------------------------- */
                .btn {
                    box-sizing: border-box;
                    width: 100%; }
                    .btn > tbody > tr > td {
                    padding-bottom: 15px; }
                    .btn table {
                    width: auto; 
                }
                    .btn table td {
                    background-color: #ffffff;
                    border-radius: 5px;
                    text-align: center; 
                }
                    .btn a {
                    background-color: #ffffff;
                    border: solid 1px #3498db;
                    border-radius: 5px;
                    box-sizing: border-box;
                    color: #3498db;
                    cursor: pointer;
                    display: inline-block;
                    font-size: 14px;
                    font-weight: bold;
                    margin: 0;
                    padding: 12px 25px;
                    text-decoration: none;
                    text-transform: capitalize; 
                }
            
                .btn-primary table td {
                    background-color: #3498db; 
                }
            
                .btn-primary a {
                    background-color: #3498db;
                    border-color: #3498db;
                    color: #ffffff; 
                }
            
                /* -------------------------------------
                    OTHER STYLES THAT MIGHT BE USEFUL
                ------------------------------------- */
                .last {
                    margin-bottom: 0; 
                }
            
                .first {
                    margin-top: 0; 
                }
            
                .align-center {
                    text-align: center; 
                }
            
                .align-right {
                    text-align: right; 
                }
            
                .align-left {
                    text-align: left; 
                }
            
                .clear {
                    clear: both; 
                }
            
                .mt0 {
                    margin-top: 0; 
                }
            
                .mb0 {
                    margin-bottom: 0; 
                }
            
                .preheader {
                    color: transparent;
                    display: none;
                    height: 0;
                    max-height: 0;
                    max-width: 0;
                    opacity: 0;
                    overflow: hidden;
                    mso-hide: all;
                    visibility: hidden;
                    width: 0; 
                }
            
                .powered-by a {
                    text-decoration: none; 
                }
            
                hr {
                    border: 0;
                    border-bottom: 1px solid #f6f6f6;
                    margin: 20px 0; 
                }
            
                /* -------------------------------------
                    RESPONSIVE AND MOBILE FRIENDLY STYLES
                ------------------------------------- */
                @media only screen and (max-width: 620px) {
                    table[class=body] h1 {
                    font-size: 28px !important;
                    margin-bottom: 10px !important; 
                    }
                    table[class=body] p,
                    table[class=body] ul,
                    table[class=body] ol,
                    table[class=body] td,
                    table[class=body] span,
                    table[class=body] a {
                    font-size: 16px !important; 
                    }
                    table[class=body] .wrapper,
                    table[class=body] .article {
                    padding: 10px !important; 
                    }
                    table[class=body] .content {
                    padding: 0 !important; 
                    }
                    table[class=body] .container {
                    padding: 0 !important;
                    width: 100% !important; 
                    }
                    table[class=body] .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important; 
                    }
                    table[class=body] .btn table {
                    width: 100% !important; 
                    }
                    table[class=body] .btn a {
                    width: 100% !important; 
                    }
                    table[class=body] .img-responsive {
                    height: auto !important;
                    max-width: 100% !important;
                    width: auto !important; 
                    }
                }
            
                /* -------------------------------------
                    PRESERVE THESE STYLES IN THE HEAD
                ------------------------------------- */
                @media all {
                    .ExternalClass {
                    width: 100%; 
                    }
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                    line-height: 100%; 
                    }
                    .apple-link a {
                    color: inherit !important;
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    text-decoration: none !important; 
                    }
                    #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                    font-size: inherit;
                    font-family: inherit;
                    font-weight: inherit;
                    line-height: inherit;
                    }
                    .btn-primary table td:hover {
                    background-color: #34495e !important; 
                    }
                    .btn-primary a:hover {
                    background-color: #34495e !important;
                    border-color: #34495e !important; 
                    } 
                }
            
                </style>
            </head>
            <body class="">
                <span class="preheader">Welcome ${senderSideEmail}, we are glad to see you reading this email.</span>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                <tr>
                    <td>&nbsp;</td>
                    <td class="container">
                    <div class="content">
            
                        <!-- START CENTERED WHITE CONTAINER -->
                        <table role="presentation" class="main">
            
                        <!-- START MAIN CONTENT AREA -->
                        <tr>
                            <td class="wrapper">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                <td>
                                    <p>Hi there,</p>
                                    <p>One of your contacts (${isSender ? `
                                        ${messageRoom.receiver.username} - ${messageRoom.receiver.email}
                                    ` : 
                                    `
                                    ${messageRoom.sender.username} - ${messageRoom.sender.email}
                                `}) has sent you a message (${content})</p>
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                    <tbody>
                                        <tr>
                                        <td align="left">
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                <td> <a href="${chatLink}" target="_blank">
                                                Go To Chat Room
                                                </a> </td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                    <p>Hope you replying to your contact soon.</p>
                                    <p>Thank you! Hope you have a good time using our application.</p>
                                </td>
                                </tr>
                            </table>
                            </td>
                        </tr>
            
                        <!-- END MAIN CONTENT AREA -->
                        </table>
                        <!-- END CENTERED WHITE CONTAINER -->
            
                        <!-- START FOOTER -->
                        <div class="footer">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                            <td class="content-block">
                                <span class="apple-link">Company Inc, 3 Abbey Road, San Francisco CA 94102</span>
                                <br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif">Unsubscribe</a>.
                            </td>
                            </tr>
                            <tr>
                            <td class="content-block powered-by">
                                Powered by <a href="http://htmlemail.io">HTMLemail</a>.
                            </td>
                            </tr>
                        </table>
                        </div>
                        <!-- END FOOTER -->
            
                    </div>
                    </td>
                    <td>&nbsp;</td>
                </tr>
                </table>
            </body>
            </html>
            `,
    };
    sendEmail(mailOptions);
}

module.exports = {
    getAllMessages,
    getMessageByID,
    getMessageByUserID,
    getMessageByRoomID,
    addMessage
}