var express = require('express');
var router = express.Router();
const {
    getAllFaculties,
    getFacultyByID,
    addFaculty,
    editFaculty,
    deleteFaculty
} = require("../controllers/facultyController");
const {
    authenticateToken,
    allowAdmin
} = require("../config/auth");

router.get('/', getAllFaculties);

router.get('/:facultyID', getFacultyByID);

router.post('/add', authenticateToken, allowAdmin, addFaculty);

router.put('/edit/:facultyID', authenticateToken, allowAdmin, editFaculty);

router.delete('/delete/:facultyID', authenticateToken, allowAdmin, deleteFaculty);

module.exports = router;