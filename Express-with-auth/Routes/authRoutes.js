const express = require("express");
const authController = require("./../Controllers/AuthControllers");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/getall", authController.getData);

module.exports = router;
