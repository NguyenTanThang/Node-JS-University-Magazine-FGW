const Term = require("../models/Term");
const routeName = `term`;
const {
    removeAllContributionByTermID
} = require("../requests/contributionRequests");

const getAllTerms = async (req, res) => {
    try {
        const terms = await Term.find();

        return res.json({
            status: 200,
            success: true,
            data: terms,
            count: terms.length
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

const getTermByID = async (req, res) => {
    try {
        const {termID} = req.params;
        const term = await Term.findById(termID);

        return res.json({
            status: 200,
            success: true,
            data: term
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

const addTerm = async (req, res) => {
    try {
        const {name, closureDate, finalClosureDate} = req.body;

        const existedTerm = await Term.findOne({name});

        if (existedTerm) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `A ${routeName} with this name have existed`
            })
        }

        const term = await new Term({
            name, closureDate, finalClosureDate,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        return res.json({
            status: 200,
            success: true,
            data: term,
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

const editTerm = async (req, res) => {
    try {
        const {termID} = req.params;
        const updatedTerm = req.body;

        const existedTerm = await Term.findById(termID);

        if (!existedTerm) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This ${routeName} does not exist`
            })
        }

        const term = await Term.findByIdAndUpdate(termID, {...updatedTerm, last_modified_date: Date.now()});

        return res.json({
            status: 200,
            success: true,
            data: term,
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

const deleteTerm = async (req, res) => {
    try {
        const {termID} = req.params;

        const existedTerm = await Term.findById(termID);

        if (!existedTerm) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This ${routeName} does not exist`
            })
        }

        await removeAllContributionByTermID(termID);
        const term = await Term.findByIdAndDelete(termID);

        return res.json({
            status: 200,
            success: true,
            data: term,
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
    getAllTerms,
    getTermByID,
    addTerm,
    editTerm,
    deleteTerm
}