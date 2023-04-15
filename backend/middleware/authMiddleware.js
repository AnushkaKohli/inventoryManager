const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//only logged in users can access the site
const protect = asyncHandler (async(req, res, next) => {
    // try{
    //     const token = req.cookies.token;
    //     //if this token does not exist
    //     if(!token){
    //         res.status(401);
    //         throw new Error("User not authorized, please login");
    //     }

    //     //Verify token and to check if the token has not expired
    //     //We are verifing the token wrt the JWT_SECRET
    //     const verified = jwt.verify(token, process.env.JWT_SECRET);

    //     //get user id from token
    //     const user = await User.findById(verified.id).select("-password");
    //     if(!user){
    //         res.status(401);
    //         throw new Error("User not found");
    //     }
    //     req.user = user;
    //     next();
    // } catch (error){
    //     res.status(401); 
    //     throw new Error("User not authorized, please login");
    // }
// });

    let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (req.user === null) {
        throw new Error();
      }
      next();
    } catch {
      res.status(401);
      throw new Error("unauthorized");
    }
  }
  if (!token) {
    res.status(400);
    throw new Error("unauthorized, no token");
  }
});

module.exports = protect;