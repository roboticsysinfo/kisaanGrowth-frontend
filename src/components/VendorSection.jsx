import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/slices/categorySlice';
import { Link } from 'react-router-dom';
import { fetchShops } from '../redux/slices/shopSLice';

const VendorSection = () => {

    const dispatch = useDispatch();

    // Categories state
    const { categories, status: categoryStatus, error: categoryError } = useSelector((state) => state.categories);
    // Access shops from Redux store
    const { shops, status, error } = useSelector((state) => state.shop);

    // Fetch categories when the component mounts
    useEffect(() => {
        if (categoryStatus === 'idle') {
            dispatch(fetchCategories());
        }
    }, [dispatch, categoryStatus]);

    useEffect(() => {
        // Fetch shops data when the component mounts
        dispatch(fetchShops({ page: 1, limit: 10 }));
    }, [dispatch]);

    // Handle loading and error states for categories
    if (categoryStatus === 'loading') {
        return <p>Loading categories...</p>;
    }
    if (categoryStatus === 'failed') {
        return <p>Error: {categoryError}</p>;
    }

    // Handle loading and error states for shops
    if (status === 'loading') {
        return <div>Loading shops...</div>;
    }
    if (status === 'failed') {
        return <div>Error loading shops: {error}</div>;
    }

    // Ensure that `shops` is an array before mapping over it
    if (!Array.isArray(shops) || shops.length === 0) {
        return <div>No shops available</div>;
    }

    console.log(shops); // Debug: check the structure of shops

    return (
        <>
            <section className="vendor-two py-80">
                <div className="side-overlay false" />
                <div className="container container-lg">
                    <div className="d-flex align-items-center justify-content-between flex-wrap mb-48 gap-16">
                        <form action="#" className="input-group w-100 max-w-418">
                            <input
                                type="text"
                                className="form-control common-input rounded-start-3"
                                placeholder="Searching..."
                            />
                            <button
                                type="submit"
                                className="input-group-text border-0 bg-main-two-600 rounded-end-3 text-white text-2xl hover-bg-main-two-700 px-24"
                            >
                                <i className="ph ph-magnifying-glass" />
                            </button>
                        </form>
                        <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-16 flex-grow-1">
                            <div className="text-gray-600 text-md flex-shrink-0">
                                {" "}
                                <span className="text-neutral-900 fw-semibold">52</span> Results Found
                            </div>
                            <div className="d-flex align-items-center gap-8 d-sm-flex d-none">
                                <button
                                    type="button"
                                    className="w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 border-main-600 text-white bg-main-600"
                                >
                                    <i className="ph ph-squares-four" />
                                </button>
                                <button
                                    type="button"
                                    className="w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 false"
                                >
                                    <i className="ph-bold ph-list-dashes" />
                                </button>
                            </div>
                            <button
                                type="button"
                                className="w-48 h-48 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                            >
                                <i className="ph-bold ph-funnel" />
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-lg-4">
                            <div className="shop-sidebar false">
                                <button
                                    type="button"
                                    className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
                                >
                                    <i className="ph ph-x" />
                                </button>
                                <div className="d-flex flex-column gap-12 px-lg-0 px-3 py-lg-0 py-4">
                                    <div className="border border-gray-50 rounded-8 p-24">
                                        <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                                            Product Category
                                        </h6>
                                        <ul className="max-h-540 overflow-y-auto scroll-sm">
                                            {categories.map((category) => (
                                                <li key={category._id} className="mb-24">
                                                    <Link
                                                        to={`/shop/${category._id}`} // Assuming a route structure like /shop/categoryId
                                                        className="text-gray-900 hover-text-main-600"
                                                    >
                                                        {category.name} ({category.productCount || 0}) {/* Adjust if you have product counts */}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="border border-gray-50 rounded-8 p-24">
                                        <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                                            Filter by Location
                                        </h6>
                                        <div className="d-flex flex-column gap-8">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8">
                            <div className="list-grid-wrapper vendors-two-item-wrapper grid-cols-3 false">
                                {shops.map((shop) => (
                                    <div className="vendors-two-item rounded-12 overflow-hidden bg-color-three border border-neutral-50 hover-border-main-two-600 transition-2" key={shop._id}>
                                        <div className="vendors-two-item__top bg-overlay style-two position-relative">
                                            <div className="vendors-two-item__thumbs h-210">
                                                <img
                                                    src={`http://localhost:5000/${shop.shop_image}`} // Adjust to your image URL
                                                    alt={shop.shop_name}
                                                    className="cover-img"
                                                />
                                            </div>
                                            <div className="position-absolute top-0 inset-inline-start-0 w-100 h-100 p-24 z-1 d-flex flex-column justify-content-between">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <span className="w-80 h-80 flex-center bg-white rounded-circle flex-shrink-0">
                                                        <img src="assets/images/thumbs/vendors-two-icon1.png" alt="Icon" />
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="text-uppercase border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2"
                                                    >
                                                        FOLLOW
                                                    </button>
                                                </div>
                                                <div className="mt-16">
                                                    <h6 className="text-white fw-semibold mb-12">
                                                        <a href={`/vendor-two-details/${shop._id}`}>
                                                            {shop.shop_name}
                                                        </a>
                                                    </h6>
                                                    <div className="flex-align gap-6">
                                                        {/* Add Star Rating */}
                                                        <div className="flex-align gap-8">
                                                            {[...Array(5)].map((_, index) => (
                                                                <span key={index} className="text-15 fw-medium text-warning-600 d-flex">
                                                                    <i className="ph-fill ph-star" />
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <span className="text-xs fw-medium text-white">4.8</span>
                                                        <span className="text-xs fw-medium text-white">(12K)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="vendors-two-item__content p-24 flex-grow-1">
                                            <div className="d-flex flex-column gap-14">
                                                <div className="flex-align gap-8">
                                                    <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
                                                        <i className="ph ph-map-pin-line" />
                                                    </span>
                                                    <p className="text-md text-gray-900">{shop.shop_location}</p>
                                                </div>
                                                <div className="flex-align gap-8">
                                                    <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
                                                        <i className="ph ph-envelope-simple" />
                                                    </span>
                                                    <a href={`mailto:${shop.shop_email}`} className="text-md text-gray-900 hover-text-main-60">
                                                        {shop.shop_email}
                                                    </a>
                                                </div>
                                                <div className="flex-align gap-8">
                                                    <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
                                                        <i className="ph ph-phone" />
                                                    </span>
                                                    <a href={`tel:${shop.shop_phone}`} className="text-md text-gray-900 hover-text-main-60">
                                                        {shop.shop_phone}
                                                    </a>
                                                </div>
                                            </div>
                                            <a
                                                className="btn bg-neutral-600 hover-bg-neutral-700 text-white py-12 px-24 rounded-8 flex-center gap-8 fw-medium mt-24"
                                                href={`/vendor-two-details/${shop._id}`}
                                            >
                                                View Shop <i className="ph ph-arrow-right" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default VendorSection;
