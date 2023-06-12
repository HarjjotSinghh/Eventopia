const express = require('express');
const router = express.Router();
const {
    createUser,
    signUpUser,
    fetchUser
} = require("../controllers/userController");

router.post("/signup", createUser);
router.post("/login", signUpUser);
router.post("/fetchUser", fetchUser);

module.exports = router;