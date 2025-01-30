import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function AppNavbar() {
  const [active, setActive] = useState('HOME'); // Track the active option
  const navigate = useNavigate(); // React Router hook for navigation
  const location = useLocation(); // Get the current path

  useEffect(() => {
    // Navigate to /home if the default root `/` is visited
    if (location.pathname === '/') {
      navigate('/home');
    } else {
      // Set the active option based on the current path
      const currentPath = location.pathname.slice(1).replace(/-/g, ' ').toUpperCase();
      setActive(currentPath);
    }
  }, [location, navigate]);

  const handleOptionClick = (option) => {
    setActive(option); // Update the active state
    const path = `/${option.toLowerCase().replace(/\s+/g, '-')}`; // Convert option to a URL-friendly path
    navigate(path); // Navigate to the corresponding path
  };

  return (
    <Navbar bg="black" variant="dark" expand="lg" className="py-3">
      <Container>
        {/* Logo Section */}
        <Navbar.Brand href="#">
          <img
            className="logo"
            src="https://t4.ftcdn.net/jpg/04/71/23/63/360_F_471236337_OGaBGaiBc85xLgHYLMXHIbC67r3RIAIP.jpg"
            alt="Logo"
          />
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {['HOME', 'MENU', 'MAKE A RESERVATION', 'CONTACT US','ADMIN'].map((option) => (
              <Nav.Link
                key={option}
                className={active === option ? 'active' : ''}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
