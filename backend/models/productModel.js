const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
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

const Product = mongoose.model("Product", productSchema);
module.exports = Product;