var express = require('express');
var router = express.Router();
const {
  getAllUsers,
  getUserByID,
  addUser,
  editUser,
  deleteUser,
  login
} = require("../controllers/userController");
const {
  authenticateToken,
  allowAdmin
} = require("../config/auth");

router.get('/', authenticateToken, allowAdmin, getAllUsers);
//router.get('/', getAllUsers);

router.get('/:userID', authenticateToken, allowAdmin, getUserByID)

router.post('/add', authenticateToken, allowAdmin, addUser);

router.post('/login', login);

router.put('/edit/:userID', authenticateToken, allowAdmin, editUser);

router.delete('/delete/:userID', authenticateToken, allowAdmin, deleteUser);

module.exports = router;