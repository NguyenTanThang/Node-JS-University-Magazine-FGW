var express = require('express');
var router = express.Router();
const {
  getAllUserRoles,
} = require("../controllers/userRoleController");

router.get('/', getAllUserRoles);

module.exports = router;