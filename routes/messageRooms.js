var express = require('express');
var router = express.Router();
const {
    getAllMessageRooms,
    getMessageRoomByID,
    getMessageRoomByUserID,
    addMessageRoom,
    getAllMessageRoomsByUserID,
    getMessageRoomBySenderAndReceiver
} = require("../controllers/messageRoomController");

router.get('/', getAllMessageRooms);

router.get('/messageRoomID/:messageRoomID', getMessageRoomByID);

router.get('/userID/:userID', getMessageRoomByUserID);

router.get('/sender/:sender/receiver/:receiver', getMessageRoomBySenderAndReceiver);

router.get('/get-all/userID/:userID', getAllMessageRoomsByUserID);

router.post('/add', addMessageRoom);

module.exports = router;