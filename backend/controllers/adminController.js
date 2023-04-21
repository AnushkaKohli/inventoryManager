const mongoose = require("mongoose");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const findProductByName = async function(req, res){
    try{
        const product = await Product.findOne({itemName : req.params.itemName});
        if(product)
            res.json(product);
        else
            res.send("No such product found in the inventory");
    }
    catch(err){
        res.send(err);
    };
}

const findProductByCategory = async function(req, res){
    try{
        const foundProduct = await Product.find({category : req.params.category});
        if (foundProduct)
            res.json(foundProduct);
        else
            res.send("No such product found in the inventory");
    }
    catch(err){
        res.send(err);
    };
}

const addProduct = async function (req, res){
    try{
        const newProduct = new Product({
            itemName : req.body.itemName,
            category : req.body.category,
            price : req.body.price,
            quantity : req.body.quantity
        });
        await newProduct.save();
        res.send("Successfully added a new product.");
    }
    catch(err){
        res.send(err);
    };
}

// const deleteProduct = async function(req,res){
//     try { 
//         const deletedProduct = req.body.deleteButton;

//         await Product.findByIdAndDelete({deletedProduct});
//         // await Product.findOneAndRemove({name : req.body.name});
//         res.send("Successfully deleted the product.");
//     }   
//     catch(err){
//         res.send(err);
//     };
// }

const deleteProduct = async function(req,res){
    try { 
        await Product.findOneAndDelete({itemName : req.body.itemName})
        .then(function(){
            res.send("Successfully deleted the product.");
        })
        .catch(function(error){
            res.send(error);
        });
    }   
    catch(err){
        res.send(err);
    };
}

const updateProduct = async function(req,res){
    try{
        const prod = await Product.findOneAndUpdate({itemName : req.body.itemName}, {$set: req.body});
        await prod.save();
        res.send(`Successfully updated the ${req.body} of the product.`);
    }
    catch(err){
        res.send(err);
    };
}

const addUser = async function (req, res){
    try{
        const newUser = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            accountType : req.body.accountType,
        });
        await newUser.save();
        res.send("Successfully added a new user.");
    }
    catch(err){
        res.send(err);
    };
}

const deleteUser = async function(req,res){
    try{
        await User.findOneAndDelete({name : req.body.name});
        res.send("Successfully deleted the user.");
    }
    catch(err){
        res.send(err);
    };
}

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

module.exports =  {findProductByName, findProductByCategory, addProduct, deleteProduct, updateProduct, addUser, deleteUser};