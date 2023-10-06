const express = require("express");
const router = express.Router();

const Productcontroller = require("../controller/Productcontroller");
const upload = require("../middleware/upload");
const { grantAccess } = require("../controller/AuthController");

router.get("/", Productcontroller.getAllproducts);
router.get("/:ProductID", Productcontroller.getproduct);
router.post(
  "/create",
  upload.single("picture"),
  Productcontroller.createProduct
);
router.put("/update/:productId", Productcontroller.updateProduct);
router.delete("/delete", Productcontroller.deleteProduct);

module.exports = router;
