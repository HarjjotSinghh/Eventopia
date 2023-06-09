const express = require('express');
const router = express.Router();
const {
    createUser,
    signUpUser
} = require("../controllers/userController");

router.post("/signup", createUser);
router.post("/login", signUpUser);

module.exports = router;