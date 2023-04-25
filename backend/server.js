const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const billRoute = require("./routes/billRoute");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
// app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/bill", billRoute);

//Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

//Error Middleware
app.use(errorHandler);

//Connecting to mongoDB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(function () {
    app.listen(PORT, function () {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(function (err) {
    console.log(err);
  });
