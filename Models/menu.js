const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
  image: {
    filename: {
      type: String,
      default: "foodImage"
    },
    url: {
      type: String,
      default: "https://via.placeholder.com/150" 
    }
  }
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
