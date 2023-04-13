const asyncHandler = require("express-async-handler");
const User = require("../models/salesmanModel");
const jwt = require("jsonwebtoken");

//only logged in users can access the site
const protect = asyncHandler (async(req, res, next) => {
    try{
        const token = req.cookies.token;
        //if this token does not exist
        if(!token){
            res.status(401);
            throw new Error("User not authorized, please login");
        }

        //Verify token and to check if the tokem has not expired
        //We are verifing the token wrt the JWT_SECRET
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        //get user id from token
        const user = await User.findById(verified.id).select("-password");
        if(!user){
            res.status(401);
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (error){
        res.status(401); 
        throw new Error("User not authorized, please login");
    }
});

module.exports = protect;