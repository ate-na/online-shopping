const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const {
  authenticate,
  updatePassword,
  grantAccess,
} = require("../controller/AuthController");
router.get("/", userController.getAllUsers);
router.get("/profile", userController.myProfile);
router.delete("/delete/:userId", userController.deleteUser);
router.patch("/updatepassword", updatePassword);
router.patch("/requestSellerRole", userController.requestSellerRole);
router.patch("/acceptSellerRequest", userController.acceptSellerRequest);
router.patch("/declineSellerRequest", userController.declineSellerRequest);
router.get("/getSellerRequests", userController.getSellerRequests);
router.get(
  "/:username",
  grantAccess("readAny", "profile"),
  userController.otherProfile
);

module.exports = router;
