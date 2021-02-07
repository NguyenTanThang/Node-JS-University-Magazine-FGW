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
const {
    authenticateToken,
    allowAdmin
} = require("../config/auth");

router.get('/', getAllFacultyAssigments);

router.get('/facultyAssignmentID/:facultyAssignmentID', getFacultyAssigmentByID);

router.get('/userID/:userID', getFacultyAssigmentByUserID);

router.get('/facultyID/:facultyID', getFacultyAssigmentByFacultyID);

router.post('/add', authenticateToken, allowAdmin, addFacultyAssigment);

router.put('/edit/:facultyAssignmentID', authenticateToken, allowAdmin, editFacultyAssigment);

router.delete('/delete/:facultyAssignmentID', authenticateToken, allowAdmin, deleteFacultyAssigment);

module.exports = router;