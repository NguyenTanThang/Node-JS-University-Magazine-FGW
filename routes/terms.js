var express = require('express');
var router = express.Router();
const {
    getAllTerms,
    getTermByID,
    addTerm,
    editTerm,
    deleteTerm
} = require("../controllers/termController");

router.get('/', getAllTerms);

router.get('/:termID', getTermByID);

router.post('/add', addTerm);

router.put('/edit/:termID', editTerm);

router.delete('/delete/:termID', deleteTerm);

module.exports = router;