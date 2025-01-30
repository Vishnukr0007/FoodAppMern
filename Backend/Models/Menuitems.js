const mongoose = require('mongoose');

// Define the schema for menu items
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  menuId: { // This links to the Menu model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    required: true,
  },
}, { timestamps: true });

// Create and export the model
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
