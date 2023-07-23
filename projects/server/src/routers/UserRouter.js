const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;

// register new account
router.post("/register", userController.register);

router.get("/users", userController.getAll);
router.get("/users/:id", userController.getUsersById);
router.get("/users/role/:role", userController.getUsersByRole);
router.post("/users", userController.createUser);
router.patch("/users/role/:role/:id", userController.editUser);
router.patch("/users/:id", userController.editUserV2);
router.delete("/users/role/:role/:id", userController.deleteUser);

// Email verification
router.patch("/verify", userController.verify);
router.post("/login", userController.login);
router.get("/v2", userController.getByTokenV2, userController.getUserByToken);

module.exports = router;
