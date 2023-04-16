const express = require("express");
const router = express.Router();
const {
  findProductByName,
  findProductByCategory,
  addProduct,
  deleteProduct,
  updateProduct,
  addUser,
  deleteUser,
  getProducts,
} = require("../controllers/adminController");

router.get("/product/:itemName", findProductByName);
router.get("/getProducts", getProducts);
router.get("/product/a/:category", findProductByCategory);
router.post("/addproduct", addProduct);
router.delete("/product", deleteProduct);
router.patch("/product", updateProduct);

module.exports = router;
