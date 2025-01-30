import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Base_Url } from "../../../Urls";

function Admenu() {
  const [menuItems, setMenuItems] = useState([]); // State to hold menu items
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false); // Track if editing an item
  const [currentMenuItem, setCurrentMenuItem] = useState(null); // Current item being edited/added
  const [newMenuItem, setNewMenuItem] = useState({ name: "", image: "", description: "" });
  const navigate = useNavigate();

  // Fetch menu items on component mount
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${Base_Url}/api/menu`);
        setMenuItems(response.data.menuItems); // Update state with fetched menu items
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        // Update menu item
        const response = await axios.put(
          `${Base_Url}/api/menu/${currentMenuItem._id}`,
          newMenuItem,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const updatedMenuItem = response.data.menuItem;
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedMenuItem._id ? updatedMenuItem : item
          )
        );
      } else {
        // Add new menu item
        const response = await axios.post(`${Base_Url}/api/menu`, newMenuItem, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setMenuItems((prevItems) => [...prevItems, response.data.menuItem]); // Add new menu item to the state
      }

      setNewMenuItem({ name: "", image: "", description: "" });
      setShowModal(false);
      setEditMode(false);
      setCurrentMenuItem(null);
    } catch (error) {
      console.error("Error adding/editing menu item:", error);
    }
  };

  // Handle delete menu item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Base_Url}/api/menu/${id}`);
      setMenuItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  // Open modal for editing a menu item
  const handleEdit = (menuItem) => {
    setNewMenuItem({ name: menuItem.name, image: menuItem.image, description: menuItem.description });
    setEditMode(true);
    setCurrentMenuItem(menuItem);
    setShowModal(true);
  };

  const handleCardClick = (menuItem) => {
    navigate(`/menulist/${menuItem._id}`, { state: { menuName: menuItem.name } });
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 text-primary">Menu List</h2>
      <Row className="g-4">
        {menuItems.map((item) => (
          <Col xs={12} sm={6} md={4} lg={3} key={item._id}>
            <Card className="text-center shadow-sm">
              <Card.Img
                variant="top"
                src={item.image}
                alt={item.name}
                className="p-3 rounded"
                onClick={() => handleCardClick(item)}
                style={{ cursor: "pointer" }}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Button variant="warning" size="sm" onClick={() => handleEdit(item)} className="me-2">
                  <FaEdit /> {/* Edit Icon */}
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>
                  <FaTrash /> {/* Delete Icon */}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {/* Add Card Option */}
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card
            className="text-center shadow-sm border-dashed d-flex align-items-center justify-content-center"
            style={{ minHeight: "250px" }}
          >
            <Button
              variant="outline-primary"
              className="rounded-circle"
              onClick={() => {
                setShowModal(true);
                setEditMode(false);
                setNewMenuItem({ name: "", image: "", description: "" });
              }}
              style={{
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              +
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Modal for adding/editing a menu item */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Menu Item" : "Add New Menu Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="menuName">
              <Form.Label>Menu Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter menu name"
                name="name"
                value={newMenuItem.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="menuImage">
              <Form.Label>Menu Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="image"
                value={newMenuItem.image}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="menuDescription">
              <Form.Label>Menu Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={newMenuItem.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {editMode ? "Update Menu Item" : "Add Menu Item"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Admenu;
