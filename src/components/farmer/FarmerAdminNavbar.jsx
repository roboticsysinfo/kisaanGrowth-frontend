// FarmerAdminNavbar.jsx
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FarmerAdminNavbar = () => {

  const navigate = useNavigate();

  const onLogout = () => {
    // Clear the token and user role from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/farmer/login"); // redirect to '/Farmer/login'
  };

  // Get the userRole from localStorage
  const userRole = localStorage.getItem("userRole");

  return (
    <Navbar bg="success" variant="dark" className="px-3">
      <Navbar.Brand href="/">Farmer Dashboard</Navbar.Brand>
      <Nav className="ms-auto">
        <Navbar.Text className="me-3">Hello, {userRole}</Navbar.Text>
        <Button variant="outline-light" onClick={onLogout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default FarmerAdminNavbar;
