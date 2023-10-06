const express = require("express");
const router = express.Router();

const CategoryController = require("../controller/categoryContoller");
const { authenticate, grantAccess } = require("../controller/AuthController");

router.post("/store", CategoryController.createCategory);
router.get("/:categoryID", CategoryController.getcategory);

module.exports = router;
