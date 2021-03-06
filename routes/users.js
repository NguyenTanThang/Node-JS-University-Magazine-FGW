var express = require('express');
var router = express.Router();
const {
  getAllUsers,
  getUserByID,
  addUser,
  editUser,
  deleteUser,
  login,
  getAllUsersWithoutAssignments,
  changePassword
} = require("../controllers/userController");
const {
  authenticateToken,
  allowAdmin
} = require("../config/auth");

router.get('/', authenticateToken, getAllUsers);
//router.get('/', getAllUsers);

router.get('/without-assignment', authenticateToken, getAllUsersWithoutAssignments);

router.get('/userID/:userID', authenticateToken, allowAdmin, getUserByID)

router.post('/add', authenticateToken, allowAdmin, addUser);

router.post('/login', login);

router.put('/edit/:userID', authenticateToken, allowAdmin, editUser);

router.put('/change-password/:userID', authenticateToken, changePassword);

router.delete('/delete/:userID', authenticateToken, allowAdmin, deleteUser);

module.exports = router;