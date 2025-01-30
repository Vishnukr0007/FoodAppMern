const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const MenuItem = require("../Models/Menuitems"); // Ensure this is the correct model path

// Route to get menu items by menu ID
router.get("/menu/:id/items", async (req, res) => {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid menu ID." });
    }

    try {
        const items = await MenuItem.find({ menuId: new mongoose.Types.ObjectId(id) });

        if (!items.length) {
            return res.status(404).json({ message: "No items found for this menu." });
        }

        res.status(200).json({ items });
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;
