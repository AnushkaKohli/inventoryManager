const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required : [true, "Please add a name"]
    },
    email:{
        type : String,
        required : [true, "Please add an email address"],
        unique : true,
        trim : true,
        // to check if the email is a valid one
        match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "Please enter a valid email"]
    },
    password : {
        type : String,
        required : [true, "Please add a password"],
        minLength : [6, "Password must be up to 6 characters"],
        // maxLength : [23, "Password must not be more than 23 characters"]
    },
    accountType : {
        type : String,
        required : [true, "Please add the account type"],
        enum : {
            values : ['Admin', 'Salesman', 'Inventory Manager', 'Sales Manager'],
            message : "You must be Admin or Salesman or Inventory Manager or Sales Manager to register/login"
        }
    }
    //,
    // photo : {
    //     type : String,
    //     required : [true, "Please add a password"],
    //     default : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
    // }, 
    // phone : {
    //     type : String,
    //     default : "+033"
    // },
    // bio : {
    //     type : String,
    //     maxLength : [250, "Bio must not be more than 250 characters"],
    //     default : "Bio"
    // }
}, {
    timestamps : true
});

//Encrypt password before saving to DB
userSchema.pre("save", async function(next){
    //Only hash the password if it has been modified (or is new)
    if(!this.isModified("password")){
        return next();
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;