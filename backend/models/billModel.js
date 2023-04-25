const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
    billType : {
        type : String,
    },
    customerName : {
        type : String
    },
    cashierName : {
        type : String,
    },
    date : {
        type : Date,
    },
    itemName: {
        type: String
    },
    quantity : {
        type: String
    },
    price: {
        type: Number
    },
    // item : [SNo, itemName, unitPrice, discount, amount],
    tax : {
        type : Number
    },
    total : {
        type : Number
    }
    // paymentMode: {},
    // status: {
    //     type: String,
    //     default: "Not Process",
    //     enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"],
    // },
}
);

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;