const express = require('express');
const { createMenuItem, getMenuItemsByMenuId, updateMenuItem, deleteMenuItem, } = require('../Controllers/menuItems.controller');
const router = express.Router();

// Route to get items for a specific menu by menuId
router.get('/:id/items', getMenuItemsByMenuId);
// Route to create a new menu item for a specific menu
router.post('/:id/items', createMenuItem);
router.put('/items/:itemId', updateMenuItem); // Update item by ID
router.delete('/items/:itemId', deleteMenuItem); // Delete item by ID

  

module.exports = router;
