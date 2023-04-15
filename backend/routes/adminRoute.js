const express = require("express");
const router = express.Router();
const { findProductByName, findProductByCategory, addProduct, deleteProduct, updateProduct, addUser, deleteUser } = require("../controllers/adminController");

router.get("/product/:itemName", findProductByName);
router.get("/product/a/:category", findProductByCategory);
router.post("/product", addProduct);
router.delete("/product", deleteProduct);
router.patch("/product", updateProduct);

module.exports = router;