const Message = require("../models/Message");
const MessageRoom = require("../models/MessageRoom");
const routeName = `message`;

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
        const {messageID} = req.params;
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
        const {userID} = req.params;
        const messages = await Message.find({author: userID})
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
        const {roomID} = req.params;
        const messages = await Message.find({room: roomID})
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
        const {author, content, room} = req.body;

        let existedMessageRoom = MessageRoom.findById(room);

        if (!existedMessageRoom) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `The message room does not exist`
            })
        }

        let message = await new Message({
            author, content, room,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();
        message = await Message.findById(message._id).populate('author').exec(); 

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

module.exports = {
    getAllMessages,
    getMessageByID,
    getMessageByUserID,
    getMessageByRoomID,
    addMessage
}