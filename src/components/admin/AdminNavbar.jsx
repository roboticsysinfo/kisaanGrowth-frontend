// AdminNavbar.jsx
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

const AdminNavbar = ({ userName, onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" className="px-3">
      <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
      <Nav className="ms-auto">
        <Navbar.Text className="me-3">Welcome, {userName}</Navbar.Text>
        <Button variant="outline-light" onClick={onLogout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default AdminNavbar;
