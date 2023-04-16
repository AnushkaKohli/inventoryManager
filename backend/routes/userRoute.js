const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUsers,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/loggedin", protect, loginStatus);
router.get("/getUsers", getUsers);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotPassword", forgotPassword);

module.exports = router;
