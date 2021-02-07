require('dotenv').config()
const User = require("../models/User");
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET);
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['x-auth-token'];
    const token = authHeader;
    if (token == null) 
        return res.json({
            status: 401,
            success: false,
            data: null,
            message: `Unauthorized Access`
        })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) 
            return res.json({
                status: 403,
                success: false,
                data: null,
                message: `Forbidden`
            })
        req.user = user
        next()
    })
}

const allowAdmin = (req, res, next) => {
    const user = req.user;
    User.findById(user._id)
    .populate("role")
    .exec()
    .then((userDoc) => {
        if (!userDoc) return res.json({
            status: 401,
            success: false,
            data: null,
            message: `Unauthorized Access`
        })
        console.log(userDoc)
        if (userDoc.role.role != "Admin") return res.json({
            status: 403,
            success: false,
            data: null,
            message: `Forbidden`
        })
        next();
    })
}

const allowAdminAndManager = (req, res, next) => {
    const user = req.user;
    User.findById(user._id, {}, {}, (err, userDoc) => {
        if (err) return res.json({
            status: 401,
            success: false,
            data: null,
            message: `Unauthorized Access`
        })
        if (userDoc.role.role != "Admin" || userDoc.role.role != "Manager") return res.json({
            status: 403,
            success: false,
            data: null,
            message: `Forbidden`
        })
        next();
    })
}

const allowAdminAndCoordinator = (req, res, next) => {
    const user = req.user;
    User.findById(user._id, {}, {}, (err, userDoc) => {
        if (err) return res.json({
            status: 401,
            success: false,
            data: null,
            message: `Unauthorized Access`
        })
        if (userDoc.role.role != "Admin" || userDoc.role.role != "Coordinator") return res.json({
            status: 403,
            success: false,
            data: null,
            message: `Forbidden`
        })
        next();
    })
}

const allowAdminAndCoordinatorAndManager = (req, res, next) => {
    const user = req.user;
    User.findById(user._id, {}, {}, (err, userDoc) => {
        if (err) return res.json({
            status: 401,
            success: false,
            data: null,
            message: `Unauthorized Access`
        })
        if (userDoc.role.role != "Admin" || userDoc.role.role != "Coordinator" || userDoc.role.role != "Manager") return res.json({
            status: 403,
            success: false,
            data: null,
            message: `Forbidden`
        })
        next();
    })
}

module.exports = {
    authenticateToken,
    allowAdmin,
    allowAdminAndManager,
    allowAdminAndCoordinator,
    allowAdminAndCoordinatorAndManager,
    generateAccessToken
}