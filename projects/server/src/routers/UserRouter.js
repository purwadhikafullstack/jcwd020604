const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
const { fileUploader, upload } = require("../middlewares/multer");

// register new account
router.post("/register", userController.register);

router.post("/reset-password", userController.resetPassword);
router.patch("/verify-password", userController.getByTokenV2,userController.verifyV2);

router.get("/users", userController.getAll);
router.get("/users/:uuid", userController.getUsersById);
router.get("/users/role/:role", userController.getUsersByRole);
router.post("/users", userController.createUser);
router.patch("/users/role/:uuid", userController.editUser);
router.patch("/users/:uuid", userController.editUserV2);
router.delete("/users/role/:role/:uuid", userController.deleteUser);

// Email verification
router.patch("/verify", userController.verify);
router.post("/login", userController.login);
router.get("/v2", userController.getByTokenV2, userController.getUserByToken);

router.post(
    "/:id",
    fileUploader({ destinationFolder: "userImg" }).single("userImg"),
    userController.insertImage
);


module.exports = router;
