var express = require('express');
var router = express.Router();
const {
    getAllComments,
    getCommentByID,
    getCommentByUserID,
    getCommentByContributionID,
    addComment
} = require("../controllers/commentController");
const {
    authenticateToken
} = require("../config/auth");

router.get('/', getAllComments);

router.get('/commentID/:commentID', getCommentByID);

router.get('/userID/:userID', getCommentByUserID);

router.get('/contributionID/:contributionID', getCommentByContributionID);

router.post('/add', authenticateToken, addComment);

module.exports = router;