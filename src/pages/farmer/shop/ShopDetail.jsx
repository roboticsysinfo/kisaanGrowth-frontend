import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "react-bootstrap";
import api from "../../../utils/api";  // Make sure to import your API utility
import toast from "react-hot-toast";

const ShopDetail = () => {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch shop details when component mounts
  useEffect(() => {
    const fetchShopDetails = async () => {
      const farmer_id = localStorage.getItem("farmerId");

      if (!farmer_id) {
        toast.error("Farmer not found, please login.");
        return;
      }

      try {
        const response = await api.get(`/farmer-shops/${farmer_id}`);
        setShopData(response.data); // Assuming response.data contains the shop details
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching shop details", error);
        toast.error("Failed to load shop details.");
        setIsLoading(false);
      }
    };

    fetchShopDetails();
  }, []);

  // Handle Delete Shop
  const handleDeleteShop = async () => {
    const farmer_id = localStorage.getItem("farmerId");

    if (!farmer_id) {
      toast.error("Farmer not found, please login.");
      return;
    }

    try {
      await api.delete(`/shop/${farmer_id}`);
      toast.success("Shop deleted successfully.");
      navigate("/farmer/dashboard");
    } catch (error) {
      toast.error("Failed to delete shop.");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mt-20 align-items-center">
        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12">
          <h3>Shop Details</h3>
        </div>
        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 text-end">
          <Link className="btn btn-success float-right" to="/farmer/shop/edit">
            Edit Shop Details
          </Link>
        </div>
      </div>

      <hr />

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <h4>{shopData?.shop_name}</h4>
                <p>{shopData?.shop_description}</p>
                <p><strong>Location:</strong> {shopData?.shop_location}</p>
                <p><strong>Village:</strong> {shopData?.village_name}</p>
                <p><strong>Pricing Preference:</strong> {shopData?.pricing_preference}</p>
                <p><strong>Preferred Buyers:</strong> {shopData?.preferred_buyers}</p>
                <p><strong>State:</strong> {shopData?.state}</p>
                <p><strong>City/District:</strong> {shopData?.city_district}</p>
                <p><strong>Phone Number:</strong> {shopData?.phoneNumber}</p>
                <p><strong>WhatsApp Number:</strong> {shopData?.whatsapp_number}</p>

                <div>
                  <img src={shopData?.shop_profile_image} alt="Shop Profile" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                  <img src={shopData?.shop_cover_image} alt="Shop Cover" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                </div>

                <div>
                  <h5>Shop Images:</h5>
                  {shopData?.shop_images?.map((image, index) => (
                    <img key={index} src={image} alt={`Shop Image ${index + 1}`} style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }} />
                  ))}
                </div>

                <div className="mt-3">
                  <button onClick={handleDeleteShop} className="btn btn-danger">
                    Delete Shop
                  </button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ShopDetail;
