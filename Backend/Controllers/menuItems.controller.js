const MenuItem = require('../Models/Menuitems'); // Ensure the path is correct
const mongoose = require("mongoose");
// Create a new menu item
const createMenuItem = async (req, res) => {
    try {
      const { name, price, description, menuId } = req.body;
  
      // Check if menuId is provided
      if (!menuId) {
        return res.status(400).json({ message: 'menuId is required' });
      }
  
      const newItem = new MenuItem({
        name,
        price,
        description,
        menuId, // The menuId should be passed in the request body
      });
  
      const savedItem = await newItem.save();
      res.status(201).json({ item: savedItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding menu item', error });
    }
  };

// Get menu items by menuId
const getMenuItemsByMenuId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid menuId' });
  }

  try {
    const items = await MenuItem.find({ menuId: id });
    if (!items || items.length === 0) {
      return res.status(404).json({ message: 'No items found for this menu' });
    }

    res.status(200).json({ items });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const updateMenuItem = async (req, res) => {
  const { itemId } = req.params;
  const updates = req.body;

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(itemId, updates, { new: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};

// Delete item by ID
const deleteMenuItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const deletedItem = await MenuItem.findByIdAndDelete(itemId);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};


module.exports = { createMenuItem,
  getMenuItemsByMenuId,
  updateMenuItem,
  deleteMenuItem, };
