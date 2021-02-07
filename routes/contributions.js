var express = require('express');
var router = express.Router();
const {
    getAllContributions,
    getContributionByID,
    getContributionByUserID,
    getContributionByFacultyID,
    addContribution,
    editContribution,
    deleteContribution
} = require("../controllers/contributionController");
const {
    authenticateToken
} = require("../config/auth");

router.get('/', getAllContributions);

router.get('/contributionID/:contributionID', getContributionByID)

router.get('/userID/:userID', getContributionByUserID);

router.get('/facultyID/:facultyID', getContributionByFacultyID);

router.post('/add', authenticateToken, addContribution);

router.put('/edit/:contributionID', authenticateToken, editContribution);

router.delete('/delete/:contributionID', authenticateToken, deleteContribution);

module.exports = router;