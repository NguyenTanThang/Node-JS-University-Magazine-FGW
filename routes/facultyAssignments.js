var express = require('express');
var router = express.Router();
const {
    getAllFacultyAssigments,
    getFacultyAssigmentByID,
    getFacultyAssigmentByUserID,
    getFacultyAssigmentByFacultyID,
    addFacultyAssigment,
    editFacultyAssigment,
    deleteFacultyAssigment
} = require("../controllers/facultyAssignmentController");

router.get('/', getAllFacultyAssigments);

router.get('/facultyAssigmentID/:facultyAssigmentID', getFacultyAssigmentByID);

router.get('/userID/:userID', getFacultyAssigmentByUserID);

router.get('/facultyID/:facultyID', getFacultyAssigmentByFacultyID);

router.post('/add', addFacultyAssigment);

router.put('/edit/:facultyAssigmentID', editFacultyAssigment);

router.delete('/delete/:facultyAssigmentID', deleteFacultyAssigment);

module.exports = router;