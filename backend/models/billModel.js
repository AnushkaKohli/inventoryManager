const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
    billType : {
        type : String,
        enum : {
            values : ['New', 'Return', 'Cancel'],
        }
    },
    customerName : {
        type : String,
        required : [true, "Please add the name of the customer"]
    },
    invoiceNo : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    cashier : {
        type : String
    },
    item : [SNo, itemName, unitPrice, discount, amount],
    tax : {
        type : Number
    },
    total : {
        type : Number
    }
});

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;