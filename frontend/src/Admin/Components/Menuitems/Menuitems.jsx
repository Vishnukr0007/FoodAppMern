import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Button, Modal, Form } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import './Menuitems.css'
import { FaEdit, FaTrash } from "react-icons/fa";
import { Base_Url } from "../../../Urls";
function Menuitems() {
  const { id } = useParams(); // Get menu ID from URL params
  const location = useLocation(); // Access passed state
  const [menuItems, setMenuItems] = useState([]); // State to hold items for this menu
  const [showModal, setShowModal] = useState(false); // State for controlling the "Add Item" modal
  const [editModal, setEditModal] = useState(false); // State for controlling the "Edit Item" modal
  const [newItem, setNewItem] = useState({ name: "", price: "", description: "" }); // State for the new item form
  const [editItem, setEditItem] = useState({ _id: "", name: "", price: "", description: "" }); // State for the item being edited

  const menuName = location.state?.menuName || "Menu"; // Use passed state or default

  // Fetch menu items for the selected menu
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${Base_Url}/api/menu/${id}/items`);
        setMenuItems(response.data.items); // Fetch items based on menu ID
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, [id]);

  // Handle input changes for adding or editing an item
  const handleChange = (e) => {
    const { name, value } = e.target;
    const setter = showModal ? setNewItem : setEditItem; // Determine which state to update
    setter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Add a new item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${Base_Url}/api/menu/${id}/items`,
        { ...newItem, menuId: id },
        { headers: { "Content-Type": "application/json" } }
      );
      setMenuItems([...menuItems, response.data.item]); // Add new item to the list
      setNewItem({ name: "", price: "", description: "" }); // Reset the form
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  // Open edit modal with selected item data
  const handleEditClick = (item) => {
    setEditItem(item); // Populate edit form with item data
    setEditModal(true); // Open edit modal
  };

  // Update an existing item
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${Base_Url}/api/menu/items/${editItem._id}`,
        editItem,
        { headers: { "Content-Type": "application/json" } }
      );
      setMenuItems(
        menuItems.map((item) => (item._id === editItem._id ? response.data.item : item))
      ); // Update item in the list
      setEditModal(false); // Close the edit modal
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Delete an item
  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${Base_Url}/api/menu/items/${itemId}`);
      setMenuItems(menuItems.filter((item) => item._id !== itemId)); // Remove item from the list
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={3} className="bg-black text-primary p-3">
          <h4>{menuName}</h4>
        </Col>

        <Col md={9}>
        <ListGroup className="custom-list">
  {menuItems.map((item) => (
    <ListGroup.Item
      key={item._id}
      className="d-flex justify-content-between align-items-center custom-table-row"
    >
      <span>{item.name}</span>
      <span>{item.description}</span>
      <span>{item.price}</span>
      <div>
        <Button
          variant="warning"
          size="sm"
          className="me-2"
          onClick={() => handleEditClick(item)}
        >
          <FaEdit /> {/* Edit Icon */}
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDelete(item._id)}
        >
          <FaTrash /> {/* Delete Icon */}
        </Button>
      </div>
    </ListGroup.Item>
  ))}
</ListGroup>

          <Row className="mt-4">
            <Col className="text-end">
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Item
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Modal for Adding New Item */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={newItem.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newItem.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Add Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for Editing Item */}
      <Modal show={editModal} onHide={() => setEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editItem.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={editItem.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editItem.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Update Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Menuitems;
