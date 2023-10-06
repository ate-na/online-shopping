const express = require("express");
const router = express.Router();

const orderController = require("../controller/orderController");
const { authenticate } = require("../controller/AuthController");

router.delete("/delete-cart", orderController.deleteInCart);
router.post("/add-cart", orderController.addToCart);
router.post("/add-order", orderController.createOrder);
router.post("/delete-order/:OrderID", orderController.deleteOrder);

module.exports = router;
