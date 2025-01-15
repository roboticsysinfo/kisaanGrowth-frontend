// AdminSidebar.jsx
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="bg-light vh-100 p-3" style={{ width: "250px" }}>
      <h5 className="mb-4">Navigation</h5>
      <Nav defaultActiveKey="/dashboard" className="flex-column">
        <Link className="nav-link" to="/admin/dashboard">Dashboard</Link >
        <Link className="nav-link" to="/admin/farmers">Farmers List</Link>
        <Link className="nav-link" to="/admin/add-farmer">Add Farmer</Link >
        <Link className="nav-link" to="/admin/users">Users</Link>
        <Link className="nav-link" to="/admin/settings">Settings</Link>
      </Nav>
    </div>
  );
};

export default AdminSidebar;
