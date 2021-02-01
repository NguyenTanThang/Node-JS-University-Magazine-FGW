var express = require('express');
var router = express.Router();
const {
    getAllFaculties,
    getFacultyByID,
    addFaculty,
    editFaculty,
    deleteFaculty
} = require("../controllers/facultyController");

router.get('/', getAllFaculties);

router.get('/:facultyID', getFacultyByID);

router.post('/add', addFaculty);

router.put('/edit/:facultyID', editFaculty);

router.delete('/delete/:facultyID', deleteFaculty);

module.exports = router;