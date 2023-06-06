const express = require('express');
const router = express.Router();
const {
    createUser,
    signUpUser
} = require("../controllers/userController");

router.post("/createUser", createUser);
router.post("/signUpUser", signUpUser);

module.exports = router;