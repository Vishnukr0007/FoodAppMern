import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you could add form submission logic (e.g., API call)
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        {/* Contact Form Column */}
        <Col xs={12} md={6} lg={5}>
          <div className="p-4 bg-black rounded shadow-lg border border-primary">
            <h2 className="text-center text-primary mb-4">Contact Us</h2>
            {isSubmitted ? (
              <Alert variant="success" className="text-center">
                <h3 className="font-weight-semibold">Thank you for your message!</h3>
                <p>We'll get back to you soon.</p>
              </Alert>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-4 text-white">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mb-4 text-white">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="message" className="mb-4 text-white">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Your message"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 py-3 mt-4"
                >
                  Send Message
                </Button>
              </Form>
            )}
          </div>
        </Col>

        {/* Map Column */}
        <Col xs={12} md={6} lg={7}>
          <div className="map-container">
            <iframe
              title="Google Maps"
              src="https://snazzy-maps-cdn.azureedge.net/assets/287720-modest.png?v=20191016033259"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactForm;
