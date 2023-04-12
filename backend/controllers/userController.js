const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../models/salesmanModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
    //we create a token with id
    //we slot in the jwt secrets
    //we want this token to expire after 24hrs so the user has to login again after 24 hrs
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : "1d"});
}

// const registerUser = (req, res) => {
//     if(!req.body.email){
//         res.status(400);
//         throw new Error("Please add an email");
//     }
//     res.send("Register User")
// };


//Register user
const registerUser = asyncHandler(
    async (req, res) => {
        const{name, email, password, accountType} = req.body;

        //Validation
        if (!name || !email || !password || !accountType) {
            res.status(400);
            throw new Error ("Please fill in all the required fields");
        }
        if (password.length < 6){
            res.status(400);
            throw new Error ("Password must be atleast upto 6 characters");
        }

        //Check if user email exists in the database
        const userExists = await User.findOne({email});
        if (userExists){
            res.status(400);
            throw new Error ("User already registered!");
        }

        //Encrypt password before saving to database
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);
        //Create new user
        const user = User.create({
            name : name,
            email : email,
            password : password,
            // password : hashedPassword,
            accountType : accountType
        })

        //Generate Token
        const token = generateToken(user._id);

        //Send HTTP-only cookie
        res.cookie("token", token, {
            //This is the path where cookie will be stored. Default is "/".
            path : "/",
            //This Boolean parameter flags the cookie to be only used by the web server.
            httpOnly : true,
            //expires in one day
            expires : new Date(Date.now() + 1000 * 86400),
            //we have different urls for frontend and backend
            sameSite : "none",
            //This marks the cookie to be used only with https.
            secure : true
        });

        if(user){
            const {_id, name, email, accountType} = user;
            res.status(201).json({
                _id, name, email, accountType, token
            });
        }
        else{
                res.status(400);
                throw new Error ("Invalid user data");
        }
    }
);

//Login User
const loginUser = asyncHandler ( async (req, res) => {
    const{email, password} = req.body;

    //Validate Request
    if (!email || !password) {
        res.status(400);
        throw new Error ("Please add email and password");
    }

    //Check if user email exists in the database
    const user = await User.findOne({email});
    if (!user) {
        res.status(400);
        throw new Error ("User not found, please register");
    }
    //User exists, check if the password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    //Generate Token
    const token = generateToken(user._id);

    //Send HTTP-only cookie
    res.cookie("token", token, {
        path : "/",
        httpOnly : true,
        expires : new Date(Date.now() + 1000 * 86400),
        sameSite : "none",
        secure : true
    });
    if (user && passwordIsCorrect){
        const {_id, name, email, accountType} = user;
        res.status(200).json({
            _id, name, email, accountType, token
        });
    }
    else{
        res.status(400);
        throw new Error ("Invalid email or passowrd");
    }
});

//Logout User
const logout = asyncHandler (async(req, res) => {
    res.cookie("token", "", {
        path : "/",
        httpOnly : true,
        //expire that cookie right away
        expires : new Date(0),
        sameSite : "none",
        secure : true
    });
    return res.status(200).json({
        message : "Successfully logged out"
    });
});

//Get User Data
const getUser = asyncHandler (async(req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        const {_id, name, email, accountType} = user;
        res.status(200).json({
            _id, name, email, accountType
        });
    }
    else{
        res.status(400);
        throw new Error ("User not found");
    }
});

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser
};