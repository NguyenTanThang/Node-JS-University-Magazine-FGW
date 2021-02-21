var express = require('express');
var router = express.Router();
const {
    getAllContributions,
    getContributionByID,
    getContributionByUserID,
    getContributionByFacultyID,
    addContribution,
    editContribution,
    deleteContribution,
    getNumberOfContributionsReport,
    getNumberOfContributorsReport,
    getContributionsWithoutCommentReport
} = require("../controllers/contributionController");
const {
    authenticateToken
} = require("../config/auth");

router.get('/', getAllContributions);

router.get('/number-of-contributions-report', getNumberOfContributionsReport);

router.get('/contributions-without-comment-report', getContributionsWithoutCommentReport);

router.get('/number-of-contributors-report', getNumberOfContributorsReport);

router.get('/contributionID/:contributionID', getContributionByID)

router.get('/userID/:userID', getContributionByUserID);

router.get('/facultyID/:facultyID', getContributionByFacultyID);

router.post('/add', authenticateToken, addContribution);

router.put('/edit/:contributionID', authenticateToken, editContribution);

router.delete('/delete/:contributionID', authenticateToken, deleteContribution);

module.exports = router;