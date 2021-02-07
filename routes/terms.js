var express = require('express');
var router = express.Router();
const {
    getAllTerms,
    getTermByID,
    addTerm,
    editTerm,
    deleteTerm
} = require("../controllers/termController");
const {
    authenticateToken,
    allowAdmin
} = require("../config/auth");

router.get('/', getAllTerms);

router.get('/:termID', getTermByID);

router.post('/add', authenticateToken, allowAdmin, addTerm);

router.put('/edit/:termID', authenticateToken, allowAdmin, editTerm);

router.delete('/delete/:termID', authenticateToken, allowAdmin, deleteTerm);

module.exports = router;