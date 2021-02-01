const FacultyAssignment = require("../models/FacultyAssignment");
const User = require("../models/User");
const Faculty = require("../models/Faculty");
const routeName = `faculty assignment`;

const getAllFacultyAssigments = async (req, res) => {
    try {
        const facultyAssigments = await FacultyAssignment.find()
        .populate('user')
        .populate('faculty')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: facultyAssigments,
            count: facultyAssigments.length
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getFacultyAssigmentByID = async (req, res) => {
    try {
        const {facultyAssigmentID} = req.params;
        const facultyAssignment = await FacultyAssignment.findById(facultyAssigmentID)
        .populate('user')
        .populate('faculty')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: facultyAssignment
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getFacultyAssigmentByUserID = async (req, res) => {
    try {
        const {userID} = req.params;
        const facultyAssignment = await FacultyAssignment.findOne({user: userID})
        .populate('user')
        .populate('faculty')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: facultyAssignment
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getFacultyAssigmentByFacultyID = async (req, res) => {
    try {
        const {facultyID} = req.params;
        const facultyAssignment = await FacultyAssignment.find({faculty: facultyID})
        .populate('user')
        .populate('faculty')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: facultyAssignment
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const addFacultyAssigment = async (req, res) => {
    try {
        const {user, faculty} = req.body;

        const existedUser = await User.findById(user);
        const existedFaculty = await Faculty.findById(faculty);

        if (!existedUser || !existedFaculty) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `Invalid user or faculty`
            })
        }

        const existedFacultyAssignment = await FacultyAssignment.findOne({user});

        if (existedFacultyAssignment) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `An account can only have 1 ${routeName}`
            })
        }

        let facultyAssignment = await new FacultyAssignment({
            user, faculty,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();
        facultyAssignment = await FacultyAssignment.findById(facultyAssignment._id)
        .populate('user')
        .populate('faculty')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: facultyAssignment,
            message: `Successfully created an ${routeName}`
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const editFacultyAssigment = async (req, res) => {
    try {
        const {facultyAssignmentID} = req.params;
        const {faculty} = req.body;
        
        const existedFacultyAssignment = await FacultyAssignment.findById(facultyAssignmentID);

        if (!existedFacultyAssignment) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This ${routeName} does not exist`
            })
        }

        const existedFaculty = await Faculty.findById(faculty);

        if (!existedFaculty) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `Invalid user or faculty`
            })
        }

        let facultyAssignment = await FacultyAssignment.findByIdAndUpdate(facultyAssignmentID, {faculty, last_modified_date: Date.now()});
    
        facultyAssignment = await FacultyAssignment.findById(facultyAssignment._id)
        .populate('user')
        .populate('faculty')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: facultyAssignment,
            message: `Successfully created an ${routeName}`
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const deleteFacultyAssigment = async (req, res) => {
    try {
        const {facultyAssignmentID} = req.params;

        const existedFacultyAssignment = await FacultyAssignment.findById(facultyAssignmentID);

        if (!existedFacultyAssignment) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This ${routeName} does not exist`
            })
        }

        const facultyAssignment = await FacultyAssignment.findByIdAndDelete(facultyAssignmentID);

        return res.json({
            status: 200,
            success: true,
            data: facultyAssignment,
            message: `Successfully created an ${routeName}`
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

module.exports = {
    getAllFacultyAssigments,
    getFacultyAssigmentByID,
    getFacultyAssigmentByUserID,
    getFacultyAssigmentByFacultyID,
    addFacultyAssigment,
    editFacultyAssigment,
    deleteFacultyAssigment
}