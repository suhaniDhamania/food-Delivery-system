const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
 userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  
  items:[
    {
      menuId: {
        type: Schema.Types.ObjectId,
        ref: "Menu",
      },
      quantity:{
        type:Number,
        required:true,
        min:1,
    },
  }
  ],
  totalAmount:{
    type:Number,
    required:true,
  },
  status:{
    type:String,
    enum:["pending","completed"],
    default:"pending",
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },
});

const Order= mongoose.model("Order",orderSchema);
module.exports=Order;