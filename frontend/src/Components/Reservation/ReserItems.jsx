import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';

function ReserItems() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    people: 1,
    specialRequests: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
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
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      date: '',
      time: '',
      people: 1,
      specialRequests: '',
    });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        {/* Left Side: Reservation Form */}
        <Col xs={12} md={6}>
          <div className="p-4 bg-black text-white rounded shadow-lg border border-primary">
            <h2 className="text-center text-primary mb-4">Make a Reservation</h2>
            {isSubmitted ? (
              <Alert variant="success" className="text-center">
                <h3 className="font-weight-semibold">Reservation Confirmed!</h3>
                <p>We look forward to serving you. See you soon!</p>
              </Alert>
            ) : (
              <Form onSubmit={handleSubmit}>
                {/* Name Field */}
                <Form.Group controlId="name" className="mb-4">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                {/* Email Field */}
                <Form.Group controlId="email" className="mb-4">
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                {/* Date Field */}
                <Form.Group controlId="date" className="mb-4">
                  <Form.Label>Reservation Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Time Field */}
                <Form.Group controlId="time" className="mb-4">
                  <Form.Label>Reservation Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Number of People Field */}
                <Form.Group controlId="people" className="mb-4">
                  <Form.Label>Number of People</Form.Label>
                  <Form.Control
                    as="select"
                    name="people"
                    value={formData.people}
                    onChange={handleChange}
                    required
                  >
                    {[...Array(10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i + 1 === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                {/* Special Requests Field */}
                <Form.Group controlId="specialRequests" className="mb-4">
                  <Form.Label>Special Requests (optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special requests?"
                  />
                </Form.Group>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 py-3 mt-4"
                >
                  Confirm Reservation
                </Button>
              </Form>
            )}
          </div>
        </Col>

        {/* Right Side: Reservation-Related Content */}
        <Col xs={12} md={6}>
          <Card className="p-4 bg-light rounded shadow-lg">
            <h3 className="text-center mb-4 text-primary">Why Choose Us?</h3>
            <Card.Text>
              <ul>
                <li><strong>Top Quality Cuisine:</strong> Indulge in the finest dishes prepared with fresh ingredients.</li>
                <li><strong>Exclusive Ambience:</strong> Enjoy a relaxed and inviting atmosphere perfect for any occasion.</li>
                <li><strong>Personalized Service:</strong> Experience impeccable service tailored to your needs.</li>
              </ul>
            </Card.Text>
            <h4 className="text-center mb-3 text-primary">Special Offers</h4>
            <Card.Text>
              <strong>Early Bird Special:</strong> 10% off when you book before 5 PM!
              <br />
              <strong>Group Discounts:</strong> Get a 15% discount for reservations of 8 or more people.
            </Card.Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ReserItems;
