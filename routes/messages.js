var express = require('express');
var router = express.Router();
const {
    getAllMessages,
    getMessageByID,
    getMessageByUserID,
    getMessageByRoomID,
    addMessage
} = require("../controllers/messageController");

router.get('/', getAllMessages);

router.get('/messageID/:messageID', getMessageByID);

router.get('/userID/:userID', getMessageByUserID);

router.get('/roomID/:roomID', getMessageByRoomID);

router.post('/add', addMessage);

module.exports = router;