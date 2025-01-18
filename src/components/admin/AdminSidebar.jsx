import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="bg-light vh-100 p-3" style={{ width: "250px" }}>
      <h5 className="mb-20">Navigation</h5>
      <Nav defaultActiveKey="/admin/dashboard" className="flex-column">
        <Link className="nav-link" to="dashboard">Dashboard</Link>  {/* Use relative paths */}
        <Link className="nav-link" to="farmers">Farmers List</Link> {/* Relative path */}
        <Link className="nav-link" to="kyc-requests">KYC Requests</Link> {/* Relative path */}
        <Link className="nav-link" to="users">Users</Link> {/* Relative path */}
        <Link className="nav-link" to="settings">Settings</Link> {/* Relative path */}
      </Nav>
    </div>
  );
};

export default AdminSidebar;
