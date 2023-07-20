const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;

// register new account
router.post("/register", userController.register);

router.get("/users", userController. getAll);

// Email verification
router.patch("/verify", userController.verify);
router.post("/login", userController.login);
router.get("/v2", userController.getByTokenV2, userController.getUserByToken);

module.exports = router;
