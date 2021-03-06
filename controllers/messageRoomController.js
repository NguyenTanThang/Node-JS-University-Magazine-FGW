const MessageRoom = require("../models/MessageRoom");
const routeName = `message room`;

const getAllMessageRooms = async (req, res) => {
    try {
        const messageRooms = await MessageRoom.find()
        .populate('receiver')
        .populate('sender')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: messageRooms,
            count: messageRooms.length
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

const getMessageRoomBySenderAndReceiver = async (req, res) => {
    try {
        const {receiver, sender} = req.params;
        let messageRoom = await MessageRoom.findOne({
            receiver, sender
        })
        .populate('receiver')
        .populate('sender')
        .exec();

        if (!messageRoom) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `Message room does not exist`
            })
        }

        return res.json({
            status: 200,
            success: true,
            data: messageRoom,
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

const getAllMessageRoomsByUserID = async (req, res) => {
    try {
        const {userID} = req.params;
        let messageRooms = await MessageRoom.find()
        .populate('receiver')
        .populate('sender')
        .exec();
        let actualMessageRooms = [];

        for (let i = 0; i < messageRooms.length; i++) {
            const messageRoom = messageRooms[i];
            console.log(messageRoom);
            if (messageRoom.sender._id == userID || messageRoom.receiver._id == userID) {
                actualMessageRooms.push(messageRoom);
            }
        }

        return res.json({
            status: 200,
            success: true,
            data: actualMessageRooms,
            count: actualMessageRooms.length
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

const getMessageRoomByID = async (req, res) => {
    try {
        const {messageRoomID} = req.params;
        const messageRoom = await MessageRoom.findById(messageRoomID)
        .populate('receiver')
        .populate('sender')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: messageRoom
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

const getMessageRoomByUserID = async (req, res) => {
    try {
        const {userID} = req.params;
        let messageRoom = await MessageRoom.find({receiver: userID})
        .populate('receiver')
        .populate('sender')
        .exec();

        if (!messageRoom) {
            messageRoom = await MessageRoom.find({sender: userID})
            .populate('receiver')
            .populate('sender')
            .exec();
        }

        if (!messageRoom) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `Message room does not exist`
            })
        }

        return res.json({
            status: 200,
            success: true,
            data: messageRoom
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

const addMessageRoom = async (req, res) => {
    try {
        const {sender, receiver} = req.body;

        let messageRoom = await new MessageRoom({
            sender, receiver,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();
        messageRoom = await MessageRoom.findById(messageRoom._id)
        .populate('sender')
        .populate('receiver')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: messageRoom,
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
    getAllMessageRooms,
    getMessageRoomByID,
    getMessageRoomByUserID,
    addMessageRoom,
    getAllMessageRoomsByUserID,
    getMessageRoomBySenderAndReceiver
}