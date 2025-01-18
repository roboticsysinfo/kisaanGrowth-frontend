// FarmerSidevbar
// .jsx
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom'

const FarmerSidevbar
  = () => {
    return (

      <>

        <div className="bg-light vh-100 p-3" style={{ width: "250px" }}>
          <h5 className="mb-4">Farmer Navigation</h5>
          <Nav defaultActiveKey="/farmer/dashboard" className="flex-column">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/my-products">My Products</Link>
            <Link className="nav-link" to="/add-product">Add Products</Link>
            <Link className="nav-link" to="/customers">Customers</Link>
            <Link className="nav-link" to="/orders">Orders</Link>
            <Link className="nav-link" to="/farmer-profile">Profile</Link>
          </Nav>
        </div>

        {/* / Menu */}
      </>


    );
  };

export default FarmerSidevbar
  ;
