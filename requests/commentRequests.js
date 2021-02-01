const Comment = require("../models/Comment");

const removeAllCommentByUserID = async (userID) => {
    try {
        const comments = await Comment.find({user: userID});

        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            await Comment.findByIdAndDelete(comment._id);
        }
    } catch (error) {
        console.log(error);
    }
}

const removeAllCommentByContributionID = async (contributionID) => {
    try {
        const comments = await Comment.find({contribution: contributionID});

        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            await Comment.findByIdAndDelete(comment._id);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    removeAllCommentByUserID,
    removeAllCommentByContributionID
}