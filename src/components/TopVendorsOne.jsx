import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShops } from '../redux/slices/shopSLice'; // Adjust path accordingly

const TopVendorsOne = () => {
  const dispatch = useDispatch();

  // Get shops from Redux state
  const { shops = [], status, error } = useSelector((state) => state.shop);

  useEffect(() => {
    // Dispatch the fetchShops action with the params for limiting results to 6
    dispatch(fetchShops({ page: 1, limit: 6 }));
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <section className="top-vendors py-80">
      <div className="container container-lg">
        <div className="section-heading">
          <div className="flex-between flex-wrap gap-8">
            <h5 className="mb-0">Top Farmers</h5>
            <Link
              to="/farmers"
              className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
            >
              All Farmers
            </Link>
          </div>
        </div>
        <div className="row gy-4 vendor-card-wrapper">
          {shops.map((shop) => (
            <div key={shop._id} className="col-xxl-3 col-lg-4 col-sm-6">
              <div className="vendor-card text-center px-16 pb-24">
                <div>
                  <img
                    src={`${process.env.REACT_APP_BASE_URL_PRIMARY}${shop.shop_image}` || 'default-image-path.png'}
                    alt={shop.shop_name}
                    className="vendor-card__logo m-12"
                  />
                  <h6 className="title mt-32">{shop.shop_name}</h6>
                  <span className="text-heading text-sm d-block">
                    {shop.shop_description}
                  </span>
                  <Link
                    to={`/vendors-details-two/${shop._id}`}
                    className="btn btn-main-two rounded-pill py-6 px-16 text-12 mt-8"
                  >
                    View Shop
                  </Link>
                </div>
                <div className="vendor-card__list mt-22 flex-center flex-wrap gap-8">
                  {/* Add additional shop items here */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopVendorsOne;
