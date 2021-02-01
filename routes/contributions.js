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

router.get('/', getAllContributions);

router.get('/contributionID/:contributionID', getContributionByID)

router.get('/userID/:userID', getContributionByUserID);

router.get('/facultyID/:facultyID', getContributionByFacultyID);

router.post('/add', addContribution);

router.put('/edit/:contributionID', editContribution);

router.delete('/delete/:contributionID', deleteContribution);

module.exports = router;