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

router.get('/', getAllUsers);

router.get('/:userID', getUserByID);

router.post('/add', addUser);

router.post('/login', login);

router.put('/edit/:userID', editUser);

router.delete('/delete/:userID', deleteUser);

module.exports = router;