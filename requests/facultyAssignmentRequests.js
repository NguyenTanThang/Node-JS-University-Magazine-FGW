const FacultyAssignment = require("../models/FacultyAssignment");

const removeAllFacultyAssignmentByUserID = async (userID) => {
    try {
        const facultyAssignments = await FacultyAssignment.find({user: userID});

        for (let i = 0; i < facultyAssignments.length; i++) {
            const facultyAssignment = facultyAssignments[i];
            await FacultyAssignment.findByIdAndDelete(facultyAssignment._id);
        }
    } catch (error) {
        console.log(error);
    }
}


const removeAllFacultyAssignmentByFacultyID = async (facultyID) => {
    try {
        const facultyAssignments = await FacultyAssignment.find({faculty: facultyID});

        for (let i = 0; i < facultyAssignments.length; i++) {
            const facultyAssignment = facultyAssignments[i];
            await FacultyAssignment.findByIdAndDelete(facultyAssignment._id);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    removeAllFacultyAssignmentByUserID,
    removeAllFacultyAssignmentByFacultyID
}