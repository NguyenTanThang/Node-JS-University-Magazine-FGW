const Faculty = require("../models/Faculty");
const routeName = `faculty`;
const {
    removeAllFacultyAssignmentByFacultyID
} = require("../requests/facultyAssignmentRequests");
const {
    removeAllContributionByFacultyID
} = require("../requests/contributionRequests");

const getAllFaculties = async (req, res) => {
    try {
        const faculties = await Faculty.find();

        return res.json({
            status: 200,
            success: true,
            data: faculties,
            count: faculties.length
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

const getFacultyByID = async (req, res) => {
    try {
        const {facultyID} = req.params;
        const faculty = await Faculty.findById(facultyID);

        return res.json({
            status: 200,
            success: true,
            data: faculty
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

const addFaculty = async (req, res) => {
    try {
        const {name} = req.body;

        const existedFaculty = await Faculty.findOne({name});

        if (existedFaculty) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `A ${routeName} with this name have existed`
            })
        }

        const faculty = await new Faculty({
            name,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        return res.json({
            status: 200,
            success: true,
            data: faculty,
            message: `Successfully created a ${routeName}`
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

const editFaculty = async (req, res) => {
    try {
        const {facultyID} = req.params;
        const updatedFaculty = req.body;

        const existedFaculty = await Faculty.findById(facultyID);

        if (!existedFaculty) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This ${routeName} does not exist`
            })
        }

        let faculty = await Faculty.findByIdAndUpdate(facultyID, {...updatedFaculty, last_modified_date: Date.now()});
        faculty = await Faculty.findById(facultyID);

        return res.json({
            status: 200,
            success: true,
            data: faculty,
            message: `Successfully updated a ${routeName}`
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

const deleteFaculty = async (req, res) => {
    try {
        const {facultyID} = req.params;

        const existedFaculty = await Faculty.findById(facultyID);

        if (!existedFaculty) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This ${routeName} does not exist`
            })
        }

        await removeAllFacultyAssignmentByFacultyID(facultyID);
        await removeAllContributionByFacultyID(facultyID);
        const faculty = await Faculty.findByIdAndDelete(facultyID);

        return res.json({
            status: 200,
            success: true,
            data: faculty,
            message: `Successfully delete a ${routeName}`
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
    getAllFaculties,
    getFacultyByID,
    addFaculty,
    editFaculty,
    deleteFaculty
}