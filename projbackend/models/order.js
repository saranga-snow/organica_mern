const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product : {
        type: ObjectId,
        ref:"Product"
    },
    name: String,
    count: Number,
    price: Number
});


const orderSchema = new mongoose.Schema({
    user:{
        type : ObjectId,
        ref : "User"
    },
    products:[ProductCartSchema],
    transaction_id:{},
    amount:{
        type : Number,
    },
    address:{
        type: String
    },
    status: {
        type : String,
        default: "Received",
        enum: ["Cancelled","Delivered","Shipped","Processing","Received"]
    },
    updated: Date
},{timestamps:true});

const Order = mongoose.model("Order",orderSchema);

const ProductCart = mongoose.model("ProductCart",ProductCartSchema);

module.exports = {Order , ProductCart};