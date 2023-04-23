const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUsers,
  loginStatus,
  updateUser,
  deleteUser,
  changePassword,
  forgotPassword,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
// router.get("/loggedin", auth, loginStatus);
router.get("/getUsers", getUsers);
router.delete("/deleteUser", deleteUser);
// router.get("/loggedin", loginStatus);
// router.patch("/updateuser", auth, updateUser);
// router.patch("/changepassword", auth, changePassword);
// router.post("/forgotPassword", forgotPassword);

module.exports = router;
