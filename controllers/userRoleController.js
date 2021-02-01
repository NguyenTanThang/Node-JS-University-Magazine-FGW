const UserRole = require("../models/UserRole");
const routeName = `user role`;

const getAllUserRoles = async (req, res) => {
    try {
        const userRoles = await UserRole.find();

        return res.json({
            status: 200,
            success: true,
            data: userRoles,
            count: userRoles.length
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
    getAllUserRoles
}