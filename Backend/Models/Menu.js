const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true, // Optional, ensures whitespace is removed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const MenuItem = mongoose.model("Menu", menuItemSchema);

module.exports = MenuItem;
