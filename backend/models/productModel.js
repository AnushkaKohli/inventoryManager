const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    itemName : {
        type : String,
        required : true
    },
    category : {
        type : String
    },
    price : {
        type : Number
    },
    quantity : {
        type : Number
    }
});

const Product = new mongoose.model("Product", productSchema);
module.exports = Product;