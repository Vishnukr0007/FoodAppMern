const express = require("express");
const router = express.Router();
const MenuItem = require("../Models/Menu");
// Route to add a new menu item
router.post("/menu", async (req, res) => {
  try {
    const { name, image, description } = req.body;

    // Validate inputs
    if (!name || !image) {
      return res.status(400).json({ error: "Name and Image are required." });
    }

    // Create and save new menu item
    const newMenuItem = new MenuItem({ name, image, description });
    await newMenuItem.save();

    res.status(201).json({
      message: "Menu item added successfully",
      menuItem: newMenuItem,
    });
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ error: "An error occurred while adding the menu item." });
  }
});

// Route to fetch all menu items
router.get("/menu", async (req, res) => {
  try {
    const menuItems = await MenuItem.find(); // Retrieve all menu items from the database
    res.status(200).json({ menuItems });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

// Route to update a menu item
router.put("/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description } = req.body;

    // Update menu item
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, image, description },
      { new: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ error: "Menu item not found." });
    }

    res.status(200).json({
      message: "Menu item updated successfully",
      menuItem: updatedMenuItem,
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: "An error occurred while updating the menu item." });
  }
});

// Route to delete a menu item
router.delete("/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedMenuItem) {
      return res.status(404).json({ error: "Menu item not found." });
    }

    res.status(200).json({
      message: "Menu item deleted successfully",
      menuItem: deletedMenuItem,
    });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "An error occurred while deleting the menu item." });
  }
});



module.exports = router;
