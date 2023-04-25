const mongoose = require("mongoose");
const Bill = require("../models/billModel");
const User = require ("../models/userModel");
const Product = require("../models/productModel");

const addBill = async function(req, res){
    try{
        const { billType, customerName, cashierName, itemName, quantity, price } = req.body;
        const newBill = new Bill({
            billType, 
            customerName,  
            cashierName, 
            itemName,
            quantity,
            price,
        })
        await newBill.save();
        res.json({
          billType, 
          customerName,  
          cashierName, 
          itemName,
          quantity,
          price,
        }); 
        console.log("bills added")
    }
    catch (err) {
      res.send(err);
    }
}

//getting array of all the bills
const getBills = async function (req, res){
  try {
    const results = await Bill.find({}, { __v: 0 });
    res.send(results);
  } catch (err) {
    res.send(err);
  }
}

//Deleting a bill
const deleteBill = async function (req, res) {
  try{
    const deleteBill = req.body.id;
    await Bill.findByIdAndDelete(deleteBill);
    res.send("Successfully deleted the bill.");
  } catch (err) {
    res.send(err);
  }
}

//Get orders and create a bill
// const getOrders = async (req, res) => {
//     try {
//         const {billType, invoiceNo} = req.body;
//         const bill = await Bill
//             .find({ buyer: req.user._id})
//             .populate("products")
//             .populate("buyer", "name")
//             .create(billType, invoiceNo);
//         res.json(bill);
//     } catch(error){
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error while getting orders",
//             error,
//     });
//     }
// }

// const getAllOrders = async (req, res) => {
//     try {
//         const {billType, invoiceNo} = req.body;
//         const bill = await Bill
//             .find({ buyer: req.user._id})
//             .populate("products")
//             .populate("buyer", "name")
//             .create(billType, invoiceNo)
//             .sort({ createdAt : "-1"});
//         res.json(bill);
//     } catch(error){
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error while getting orders",
//             error,
//     });
//     }
// }

//order status
// export const orderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;
//     const order = await Bill.findByIdAndUpdate(
//       orderId,
//       { status },
//       { new: true }
//     );
//     res.json(order);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while updating order",
//       error,
//     });
//   }
// };

module.exports = {addBill,
                  getBills,
                  deleteBill}