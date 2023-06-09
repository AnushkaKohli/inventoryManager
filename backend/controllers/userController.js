const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  //we create a token with id
  //we slot in the jwt secrets
  //we want this token to expire after 24hrs so the user has to login again after 24 hrs
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, accountType } = req.body;

  //Validation
  if (!name || !email || !password || !accountType) {
    res.status(400);
    throw new Error("Please fill in all the required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be atleast upto 6 characters");
  }

  //Check if user email exists in the database
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Encrypt password before saving to database
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  //Create new user
  const user = User.create({
    name: name,
    email: email,
    password: password,
    // password : hashedPassword,
    accountType: accountType,
  });

  //Generate Token
  const token = generateToken(user._id);
  // console.log(token);

  //Send HTTP-only cookie
  res.cookie("token", token, {
    //This is the path where cookie will be stored. Default is "/".
    path: "/",
    //This Boolean parameter flags the cookie to be only used by the web server.
    httpOnly: true,
    //expires in one day
    expires: new Date(Date.now() + 1000 * 86400),
    //we have different urls for frontend and backend
    sameSite: "none",
    //This marks the cookie to be used only with https.
    secure: true,
  });
  // console.log(res.cookie);

  if (user) {
    const { _id, name, email, accountType } = user;
    res.status(201).json({
      _id,
      name,
      email,
      accountType,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Enter all details");
  }
  const user = await User.findOne({
    email,
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Wrong credentials");
  }
});
//Logout User
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    //expire that cookie right away
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({
    message: "Successfully logged out",
  });
});
const loginStatus = asyncHandler(async (req, res) => {
  const { name, email, _id, accountType } = req.user;
  console.log(req.user);
  if (!name && !email && !_id && !accountType) {
    res.status(401).json(false);
  } else {
    res.status(200).json(true);
  }
  // res.status(200).json({
  //   id: _id,
  //   name,
  //   email,
  //   accountType
  // });
});

//Get User Data
const getUsers = asyncHandler(async (req, res) => {
  try {
    const results = await User.find({}, { __v: 0 });
    // const data = JSON.stringify(results).toArray();
    res.send(results);
    // res.send(req.rootUser);
  } catch (err) {
    res.send(err);
  }
});

// Delete User
const deleteUser = async function (req, res) {
  try {
    const deleteUser = req.body.id;

    await User.findByIdAndDelete(deleteUser);
    res.send("Successfully deleted the User.");
  } catch (err) {
    res.send(err);
  }
};

//Update User
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    //Destructuring all the properties of the user
    const { name, email, accountType } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.accountType = req.body.accountType || accountType;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      accountType: updatedUser.accountType,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Change password of the user
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, password } = req.body;

  //Validate if the user exists
  if (!user) {
    res.status(400);
    throw new Error("User not found, please sign up");
  }

  //Validate to check if new and old password has been entered
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }

  //To check if the old password enetered matches password in the DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  //Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("Password changed successfully");
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

//Forgot Password - not using this functionality
const forgotPassword = asyncHandler(async (req, res) => {
  res.send("Forgot Password");
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUsers,
  loginStatus,
  updateUser,
  deleteUser,
  changePassword,
  forgotPassword,
};
