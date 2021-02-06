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

router.get('/facultyAssignmentID/:facultyAssignmentID', getFacultyAssigmentByID);

router.get('/userID/:userID', getFacultyAssigmentByUserID);

router.get('/facultyID/:facultyID', getFacultyAssigmentByFacultyID);

router.post('/add', addFacultyAssigment);

router.put('/edit/:facultyAssignmentID', editFacultyAssigment);

router.delete('/delete/:facultyAssignmentID', deleteFacultyAssigment);

module.exports = router;