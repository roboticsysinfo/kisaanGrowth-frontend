// FarmerSidevbar
// .jsx
import React from "react";
import { Nav } from "react-bootstrap";

const FarmerSidevbar
 = () => {
  return (
    <div className="bg-light vh-100 p-3" style={{ width: "250px" }}>
      <h5 className="mb-4">Farmer Navigation</h5>
      <Nav defaultActiveKey="/farmer/dashboard" className="flex-column">
        <Nav.Link href="/farmer/dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/farmer/my-products">My Products</Nav.Link>
        <Nav.Link href="/farmer/add-products">Add Products</Nav.Link>
        <Nav.Link href="/farmer/customers">Customers</Nav.Link>
        <Nav.Link href="/farmer/orders">Orders</Nav.Link>
        <Nav.Link href="/farmer/farmer-profile">Profile</Nav.Link>
      </Nav>
    </div>
  );
};

export default FarmerSidevbar
;
