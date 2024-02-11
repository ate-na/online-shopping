const express = require("express");
const router = express.Router();

const CategoryController = require("../controller/categoryContoller");
const { authenticate, grantAccess } = require("../controller/AuthController");
const upload = require("../middleware/upload");

router.post(
  "/store",
  upload.single("picture"),
  CategoryController.createCategory
);
router.get("/:categoryID", CategoryController.getcategory);
router.get("/", CategoryController.getAllCategories);

module.exports = router;
