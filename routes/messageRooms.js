var express = require('express');
var router = express.Router();
const {
    getAllMessageRooms,
    getMessageRoomByID,
    getMessageRoomByUserID,
    addMessageRoom
} = require("../controllers/messageRoomController");

router.get('/', getAllMessageRooms);

router.get('/messageRoomID/:messageRoomID', getMessageRoomByID);

router.get('/userID/:userID', getMessageRoomByUserID);

router.post('/add', addMessageRoom);

module.exports = router;