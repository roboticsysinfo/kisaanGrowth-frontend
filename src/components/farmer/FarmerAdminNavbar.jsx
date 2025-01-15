// FarmerAdminNavbar.jsx
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

const FarmerAdminNavbar = ({ farmerName, onLogout }) => {
  return (
    <Navbar bg="success" variant="dark" className="px-3">
      <Navbar.Brand href="/">Farmer Dashboard</Navbar.Brand>
      <Nav className="ms-auto">
        <Navbar.Text className="me-3">Hello, {farmerName}</Navbar.Text>
        <Button variant="outline-light" onClick={onLogout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default FarmerAdminNavbar;
