import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "react-bootstrap";
import api from "../../../utils/api";  // Make sure to import your API utility
import toast from "react-hot-toast";

const AddShop = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shop_name: "",
    shop_description: "",
    shop_location: "",
    pricing_preference: "fixed_price",
    preferred_buyers: "retail_customers",
    certification_name: "",
    shop_image: null,
    certification_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const farmer_id = localStorage.getItem("farmerId"); // Get farmer ID from JWT token

    if (!farmer_id) {
      toast.error("Farmer not found, please login.");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    formDataToSend.append("farmer_id", farmer_id);

    try {
      const response = await api.post("/shop/create", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Shop created successfully!");
      navigate("/farmer/dashboard"); // Redirect to farmer's dashboard or wherever
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating shop.");
    }
  };

  return (
    <div className="container mt-5">

      <div className="row mt-20 align-items-center">
        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12">
          <h3>Add Shop Detail</h3>
        </div>
        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12">
          <Link className="btn btn-success float-right" to="shop-details">View Shop Details</Link>
        </div>
      </div>

      <hr />

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Shop Name</label>
              <input
                type="text"
                className="form-control"
                name="shop_name"
                value={formData.shop_name}
                onChange={handleChange}
                required
              />
            </div>


            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12">

                <div className="mb-3">
                  <label className="form-label">State</label>
                  <select className="form-control"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>
                  </select>
                </div>

              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">

                <div className="mb-3">
                  <label className="form-label">City/District</label>
                  <select className="form-control"
                    name="city_district"
                    value={formData.city_district}
                    onChange={handleChange}
                  >
                    <option value="">Select City/District</option>
                  </select>
                </div>

              </div>
            </div>


            <div className="row">
              <div className="col-lg-6 col-xs-12 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">Pricing Preference</label>
                  <select
                    className="form-control"
                    name="pricing_preference"
                    value={formData.pricing_preference}
                    onChange={handleChange}
                  >
                    <option value="fixed_price">Fixed Price</option>
                    <option value="negotiation_price">Negotiated Price</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-xs-12 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">Preferred Buyers</label>
                  <select
                    className="form-control"
                    name="preferred_buyers"
                    value={formData.preferred_buyers}
                    onChange={handleChange}
                  >
                    <option value="retail_customers">Retail Customers</option>
                    <option value="wholesalers">Wholesalers</option>
                    <option value="restaurants">Restaurants</option>
                    <option value="hotels">Hotels</option>
                  </select>
                </div>
              </div>
            </div>





            <div className="mb-3">
              <label className="form-label">Shop Description</label>
              <textarea
                className="form-control"
                name="shop_description"
                value={formData.shop_description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <div className="col-lg-12 col-xs-12 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">Shop Logo Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="shop_image"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-12 col-xs-12 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">Shop Cover Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="shop_cover_image"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>



            <button type="submit" className="btn btn-success w-100">
              Add Shop
            </button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddShop;
