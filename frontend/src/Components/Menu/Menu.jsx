import React, { useState, useEffect } from 'react';
import './Menu.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Base_Url } from '../../Urls';
function Menu() {
  const [items, setItems] = useState([]); // Store menu items
  const [categories, setCategories] = useState([]); // Store categories
  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category name
  const [selectedMenuId, setSelectedMenuId] = useState(''); // Selected menu ID
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error message state

  // Fetch menu categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${Base_Url}/api/menu`); // Adjust API URL if needed
        const menuItems = response.data.menuItems; // Ensure backend returns menuItems array

        setCategories(menuItems);

        // Default to the first category
        if (menuItems.length > 0) {
          setSelectedCategory(menuItems[0].name);
          setSelectedMenuId(menuItems[0]._id);
  
        }
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load menu categories.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch menu items when selectedMenuId changes
  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!selectedMenuId) return; // Avoid making requests if no ID is selected
  
      try {
        setLoading(true);
        
        const response = await axios.get(`${Base_Url}/api/menu/${selectedMenuId}/items`);
        
        setItems(response.data.items || []);
        setError('');
      } catch (err) {
        if (err.response) {
          if (err.response.status === 400) {
            setError('Invalid menu ID.');
          } else if (err.response.status === 404) {
            setError('No items found for this menu.');
          } else {
            setError('Failed to load menu items.');
          }
        } else {
          setError('Network error. Please try again.');
        }
        console.error('Error fetching menu items:', err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

  
    fetchMenuItems();
  }, [selectedMenuId]);
  

  return (
    <div className="Listmenu">
      {/* Menu Category Buttons */}
      <div className="menu">
        {categories.map((category) => (
          <Button
            key={category._id}
            className={`buttons ${selectedCategory === category.name ? 'active' : ''}`}
            onClick={() => {
              console.log("Selected Category:", category.name, "Selected Menu ID:", category._id);
              setSelectedCategory(category.name); // Update selected category
              setSelectedMenuId(category._id); // Update selected menu ID
            }}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="box p-4">
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : items.length > 0 ? (
              <ul className="list-unstyled">
                {items.map((item) => (
                  <li key={item._menuId} className="menu-item">
                    <span className="item-name text-white">{item.name}</span>
                    <h6>{item.description}</h6>
                    <span className="price text-white">${item.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white">No items available for this category.</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Menu;
