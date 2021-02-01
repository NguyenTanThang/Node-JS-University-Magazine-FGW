const Comment = require("../models/Comment");
const routeName = `comment`;

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find()
        .populate('contribution')
        .populate('user')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: comments,
            count: comments.length
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

const getCommentByID = async (req, res) => {
    try {
        const {commentID} = req.params;
        const comment = await Comment.findById(commentID)
        .populate('contribution')
        .populate('user')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: comment
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

const getCommentByUserID = async (req, res) => {
    try {
        const {userID} = req.params;
        const comments = await Comment.find({user: userID})
        .populate('contribution')
        .populate('user')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: comments,
            count: comments.length
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

const getCommentByContributionID = async (req, res) => {
    try {
        const {contributionID} = req.params;
        const comments = await Comment.find({contribution: contributionID})
        .populate('contribution')
        .populate('user')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: comments,
            count: comments.length
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

const addComment = async (req, res) => {
    try {
        const {contribution, content, user} = req.body;

        let comment = await new Comment({
            contribution, content, user,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();
        comment = await Comment.findById(comment._id)
        .populate('contribution')
        .populate('user')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: comment,
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

module.exports = {
    getAllComments,
    getCommentByID,
    getCommentByUserID,
    getCommentByContributionID,
    addComment
}