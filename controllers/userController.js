const User = require("../models/User");
const FacultyAssignment = require("../models/FacultyAssignment");
const routeName = `user`;
const {
    encrypt,
    compare
} = require("../utils/encryptor");
const {
    removeAllContributionByUserID
} = require("../requests/contributionRequests");
const {
    removeAllCommentByUserID
} = require("../requests/commentRequests");
const {
    removeAllFacultyAssignmentByUserID
} = require("../requests/facultyAssignmentRequests");
const {
    generateAccessToken
} = require("../config/auth");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role').exec();

        return res.json({
            status: 200,
            success: true,
            data: users,
            count: users.length
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

const getAllUsersWithoutAssignments = async (req, res) => {
    try {
        let users = await User.find()
        .populate('role')
        .exec();
        let freeUsers = [];

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const facultyAssignment = await FacultyAssignment.findOne({
                user: user._id
            })
            console.log(!facultyAssignment);
            if (!facultyAssignment) {
                freeUsers.push(user);
            }
        }

        console.log(freeUsers);

        return res.json({
            status: 200,
            success: true,
            data: freeUsers,
            count: freeUsers.length
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

const getUserByID = async (req, res) => {
    try {
        const {userID} = req.params;
        const user = await User.findById(userID).populate('role').exec();

        return res.json({
            status: 200,
            success: true,
            data: user
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

const addUser = async (req, res) => {
    try {
        const {email, username, password, role} = req.body;

        const existedUser = await User.findOne({email});

        if (existedUser) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `Please enter a valid email`
            })
        }

        let encrytedPassword = encrypt(password);
        const user = await new User({
            email, username, password: encrytedPassword, role,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        return res.json({
            status: 200,
            success: true,
            data: user,
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

const editUser = async (req, res) => {
    try {
        const {userID} = req.params;
        const updatedUser = req.body;

        const existedUser = await User.findById(userID);

        if (!existedUser) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This ${routeName} does not exist`
            })
        }

        let user = await User.findByIdAndUpdate(userID, {...updatedUser, last_modified_date: Date.now()});
        user = await User.findById(userID)
        .populate('role')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: user,
            message: `Successfully updated an ${routeName}`
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

const deleteUser = async (req, res) => {
    try {
        const {userID} = req.params;

        const existedUser = await User.findById(userID);

        if (!existedUser) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This ${routeName} does not exist`
            })
        }

        await removeAllFacultyAssignmentByUserID(userID);
        await removeAllCommentByUserID(userID);
        await removeAllContributionByUserID(userID);
        const user = await User.findByIdAndDelete(userID);

        return res.json({
            status: 200,
            success: true,
            data: user,
            message: `Successfully deleted an ${routeName}`
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

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const existedUser = await User.findOne({email}).populate('role').exec();

        if (!existedUser || !compare(password, existedUser.password)) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `Invalid email or password`
            })
        }

        const user = existedUser;
        const token = generateAccessToken({
            ...user._doc
        });
        let facultyAssignment;

        if (user.role.role === "Coordinator" || user.role.role === "Student" || user.role.role === "Guest") {
            facultyAssignment = await FacultyAssignment.findOne({
                user: user._id
            })
            return res.json({
                status: 200,
                success: true,
                data: {
                    ...user._doc,
                    token,
                    facultyAssignment
                },
                message: `Successfully logged in`
            })
        }

        return res.json({
            status: 200,
            success: true,
            data: {
                ...user._doc,
                token
            },
            message: `Successfully logged in`
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

const changePassword = async (req, res) => {
    try {
        const {userID} = req.params;
        const {oldPassword, newPassword} = req.body;

        const existedUser = await User.findById(userID);

        if (!existedUser) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `This ${routeName} does not exist`
            })
        }

        if (!compare(oldPassword, existedUser.password)) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `Invalid old password`
            })
        }

        let password = encrypt(newPassword);
        let user = await User.findByIdAndUpdate(userID, {password, last_modified_date: Date.now()});
        user = await User.findById(userID)
        .populate('role')
        .exec();

        return res.json({
            status: 200,
            success: true,
            data: user,
            message: `Successfully updated an ${routeName}`
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
    getAllUsers,
    getUserByID,
    addUser,
    editUser,
    deleteUser,
    login,
    getAllUsersWithoutAssignments,
    changePassword
}