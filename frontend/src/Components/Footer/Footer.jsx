import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

function Footer() {
  return (
    <div className="footer-wrapper">
      <Container fluid className="footer py-4">
        <Row className="text-white justify-content-center align-items-center">
          {/* First box: Connect with us */}
          <Col md={3} className="footer-box">
            <h3 className="fo-head">Connect With Us</h3>
            <p>Email: vishnukrishnankutty54@gmail.com</p>
            <p>Phone: +91 6282899456</p>
          </Col>

          {/* Second box: Logo and social media icons */}
          <Col md={3} className="footer-box text-center">
            <Image 
              src="https://t4.ftcdn.net/jpg/04/71/23/63/360_F_471236337_OGaBGaiBc85xLgHYLMXHIbC67r3RIAIP.jpg" 
              alt="Logo" 
              className="footer-logo mb-3" 
              fluid 
            />
            <div className="social-icons">
          <a href="/" className="social-icon mx-2">
            <FaFacebook size={24} />
          </a>
          <a href="/" className="social-icon mx-2">
            <FaTwitter size={24} />
          </a>
          <a href="/" className="social-icon mx-2">
            <FaInstagram size={24} />
          </a>
        </div>
          </Col>

          {/* Third box: Find us */}
          <Col md={3} className="footer-box">
            <h3 className="fo-head">Find Us</h3>
            <p>123 Main Street</p>
            <p>City, State, 12345</p>
          </Col>
        </Row>
      </Container>

      {/* Copyright section */}
      <Container fluid className="footer-copyright">
        <Row>
          <Col>
            <p>© 2025 Your Company Name. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
