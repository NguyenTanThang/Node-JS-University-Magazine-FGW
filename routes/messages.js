var express = require('express');
var router = express.Router();
const {
    getAllMessages,
    getMessageByID,
    getMessageByUserID,
    getMessageByRoomID,
    addMessage
} = require("../controllers/messageController");
const {
    authenticateToken
} = require("../config/auth");

router.get('/', getAllMessages);

router.get('/messageID/:messageID', getMessageByID);

router.get('/userID/:userID', getMessageByUserID);

router.get('/roomID/:roomID', getMessageByRoomID);

router.post('/add', authenticateToken, addMessage);

module.exports = router;