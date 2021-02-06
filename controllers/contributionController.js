const Contribution = require("../models/Contribution");
const User = require("../models/User");
const Faculty = require("../models/Faculty");
const Term = require("../models/Term");
const routeName = `contribution`;

const getAllContributions = async (req, res) => {
    try {
        const contributions = await Contribution.find()
        .populate('contributor')
        .populate('faculty')
        .populate('term')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: contributions,
            count: contributions.length
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

const getContributionByID = async (req, res) => {
    try {
        const {contributionID} = req.params;
        const contribution = await Contribution.findById(contributionID)
        .populate('contributor')
        .populate('faculty')
        .populate('term')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: contribution
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

const getContributionByUserID = async (req, res) => {
    try {
        const {userID} = req.params;
        const contributions = await Contribution.find({contributor: userID})
        .populate('contributor')
        .populate('faculty')
        .populate('term')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: contributions,
            count: contributions.length
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

const getContributionByFacultyID = async (req, res) => {
    try {
        const {facultyID} = req.params;
        const contributions = await Contribution.find({faculty: facultyID})
        .populate('contributor')
        .populate('faculty')
        .populate('term')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: contributions,
            count: contributions.length
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

const addContribution = async (req, res) => {
    try {
        const {title, docFileURL, imageFileURL, contributor, faculty, term} = req.body;
        console.log(req.body);

        const existedTerm = await Term.findById(term);
        const existedFaculty = await Faculty.findById(faculty);
        const existedUser = await User.findById(contributor);

        if (!existedTerm || !existedFaculty || !existedUser) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `Invalid crucial data such as term, faculty or contributor`
            })
        }

        const contribution = await new Contribution({
            title, docFileURL, imageFileURL, contributor, faculty, term,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        return res.json({
            status: 200,
            success: true,
            data: contribution,
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

const editContribution = async (req, res) => {
    try {
        const {contributionID} = req.params;
        const updatedContribution = req.body;

        const existedContribution = await Contribution.findById(contributionID);

        if (!existedContribution) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This ${routeName} does not exist`
            })
        }

        let contribution = await Contribution.findByIdAndUpdate(contributionID, {...updatedContribution, last_modified_date: Date.now()});

        contribution = await Contribution.findById(contributionID)
        .populate('contributor')
        .populate('faculty')
        .populate('term')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: contribution,
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

const deleteContribution = async (req, res) => {
    try {
        const {contributionID} = req.params;

        const existedContribution = await Contribution.findById(contributionID);

        if (!existedContribution) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This ${routeName} does not exist`
            })
        }

        const contribution = await Contribution.findByIdAndDelete(contributionID);

        return res.json({
            status: 200,
            success: true,
            data: contribution,
            message: `Successfully deleted a ${routeName}`
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
    getAllContributions,
    getContributionByID,
    getContributionByUserID,
    getContributionByFacultyID,
    addContribution,
    editContribution,
    deleteContribution
}