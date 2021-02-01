const Contribution = require("../models/Contribution");
const {
    removeAllCommentByContributionID
} = require("./commentRequests");

const removeAllContributionByUserID = async (userID) => {
    try {
        const contributions = await Contribution.find({contributor: userID});

        for (let i = 0; i < contributions.length; i++) {
            const contribution = contributions[i];
            await removeAllCommentByContributionID(contribution._id);
            await Contribution.findByIdAndDelete(contribution._id);
        }
    } catch (error) {
        console.log(error);
    }
}

const removeAllContributionByFacultyID = async (facultyID) => {
    try {
        const contributions = await Contribution.find({faculty: facultyID});

        for (let i = 0; i < contributions.length; i++) {
            const contribution = contributions[i];
            await removeAllCommentByContributionID(contribution._id);
            await Contribution.findByIdAndDelete(contribution._id);
        }
    } catch (error) {
        console.log(error);
    }
}

const removeAllContributionByTermID = async (termID) => {
    try {
        const contributions = await Contribution.find({term: termID});

        for (let i = 0; i < contributions.length; i++) {
            const contribution = contributions[i];
            await removeAllCommentByContributionID(contribution._id);
            await Contribution.findByIdAndDelete(contribution._id);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    removeAllContributionByUserID,
    removeAllContributionByFacultyID,
    removeAllContributionByTermID
}