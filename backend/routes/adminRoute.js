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
const auth = require("../middleware/authMiddleware");

router.get("/product/:itemName", findProductByName);
router.get("/getProducts", getProducts);
router.get("/product/a/:category", findProductByCategory);
router.post("/addproduct", addProduct);
router.delete("/product", deleteProduct);
router.patch("/product", updateProduct);
router.post("/adduser", addUser);
router.delete("/deleteuser", deleteUser);

module.exports = router;
