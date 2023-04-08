const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./routes/userRoute");

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

//Routes Middleware
app.use("/api/users", userRoute);

//Routes
app.get("/", (req,res) => {
    res.send("Home Page");
});

const PORT = process.env.PORT || 3000;

//Connecting to mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(function(){
        app.listen(PORT, function(){
            console.log(`Server started on port $(PORT)`);
        })
    })
    .catch(function(err){
        console.log(err);
    });