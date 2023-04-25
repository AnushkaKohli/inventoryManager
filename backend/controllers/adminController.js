const mongoose = require("mongoose");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const findProductByName = async function (req, res) {
  try {
    const product = await Product.findOne({ itemName: req.params.itemName });
    if (product) res.json(product);
    else res.send("No such product found in the inventory");
  } catch (err) {
    res.send(err);
  }
};

const findProductByCategory = async function (req, res) {
  try {
    const foundProduct = await Product.find({ category: req.params.category });
    if (foundProduct) res.json(foundProduct);
    else res.send("No such product found in the inventory");
  } catch (err) {
    res.send(err);
  }
};

const addProduct = async function (req, res) {
  try {
    const newProduct = new Product({
      itemName: req.body.itemName,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    });
    newProduct.save();
    // res.send("Successfully added a new product.");
  } catch (err) {
    res.send(err);
  }
};

// get a array of all products
const getProducts = async function (req, res) {
  try {
    const results = await Product.find({}, { __v: 0 });
    // const data = JSON.stringify(results).toArray();
    res.send(results);
  } catch (err) {
    res.send(err);
  }
};

const deleteProduct = async function (req, res) {
  try {
    const deleteProduct = req.body.id;

    await Product.findByIdAndDelete(deleteProduct);
    // await Product.findOneAndRemove({name : req.body.name});
    res.send("Successfully deleted the product.");
  } catch (err) {
    res.send(err);
  }
};
// const deleteProduct = async function(req,res){
//     try {
//         await Product.findOneAndDelete({_id : '64371515d66d8df7a8a447ab'});
//         // await Product.findOneAndRemove({name : req.body.name});
//         res.send("Successfully deleted the product.");
//     }
//     catch(err){
//         res.send(err);
//     };
// }

const updateProduct = async function (req, res) {
  try {
    const prod = await Product.findOneAndUpdate(
      { name: req.body.name },
      { $set: req.body }
    );
    await prod.save();
    res.send("Successfully updated the price of the product.");
  } catch (err) {
    res.send(err);
  }
};

const addUser = async function (req, res) {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      accountType: req.body.accountType,
    });
    newUser.save();
    res.send("Successfully added a new user.");
  } catch (err) {
    res.send(err);
  }
};

const deleteUser = async function (req, res) {
  try {
    Product.findOneAndDelete({ name: req.body.name });
    res.send("Successfully deleted the user.");
  } catch (err) {
    res.send(err);
  }
};

// exports.addProduct = async(req, res, next) => {
//     try {
//         const { itemName, category, price, quantity } = req.body;
//         const product = await Product.create({
//           itemName,
//           category,
//           price,
//           quantity
//         });
//         res.status(200).json(product);
//       } catch (err) {
//         next(err);
//       }
// }

// exports.addUser = async(req, res, next) => {
//     try {
//         const { name, email, password, accountType} = req.body;
//         const user = await User.create({
//             name,
//             email,
//             password,
//             accountType
//         });
//         res.status(200).json(user);
//       } catch (err) {
//         next(err);
//       }
// }

// exports.listByCategory = async (req, res) => {
//     const category = req.params.category;
//     const posts = await Post.find({ category }).sort('-score');
//     res.json(posts);
//   };

module.exports = {
  findProductByName,
  findProductByCategory,
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  addUser,
  deleteUser,
};
