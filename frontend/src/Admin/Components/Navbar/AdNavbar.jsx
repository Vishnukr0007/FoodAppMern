import React from "react";
import { Navbar, Nav, Container, NavDropdown, NavLink } from "react-bootstrap";

function AdminNavbar() {
  return (
    <Navbar bg="black" variant="dark" expand="lg" className="py-3 shadow">
      <Container>
        <Navbar.Brand href="/admin"><img className="logo" src='https://t4.ftcdn.net/jpg/04/71/23/63/360_F_471236337_OGaBGaiBc85xLgHYLMXHIbC67r3RIAIP.jpg'alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar" />
        <Navbar.Collapse id="admin-navbar">
          <Nav className="ms-auto">
            <NavLink ></NavLink>
            <NavDropdown title="Profile" id="admin-profile-dropdown">
              <NavDropdown.Item href="/admin/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="/admin/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
