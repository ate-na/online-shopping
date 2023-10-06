const express = require("express");
const router = express.Router();

const commentController = require("../controller/commentController");
// const {authenticate}=require('../middleware/authenticate')
const { authenticate } = require("../controller/AuthController");

router.get("/:ProductID", commentController.Showcomments);
router.post("/", commentController.createcomment);

module.exports = router;
