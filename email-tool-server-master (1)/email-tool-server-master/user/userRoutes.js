const express = require("express");
const { createUser, loginUser, getUserById } = require("./userController");
const authMiddleware = require("../middlwares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/", authMiddleware, getUserById);

module.exports = router;
