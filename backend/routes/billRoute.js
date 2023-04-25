const express = require("express");
const router = express.Router();
const {addBill, getBills, deleteBill} = require("../controllers/billController");

router.post("/addBill", addBill);
router.get("/getBill", getBills);
router.delete("/delete", deleteBill);

module.exports = router;