const express = require("express");
const { loginUser } = require("../../modules/auth/authController");


const router = express.Router();

router.post("/", loginUser);
module.exports = router;