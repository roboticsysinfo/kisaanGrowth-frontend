import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./app.css"
import RouteScrollToTop from "./helper/RouteScrollToTop";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import HomePageOne from "./pages/HomePageOne";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPageOne from "./pages/ProductDetailsPageOne";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ContactPage from "./pages/ContactPage";
import FarmerLogin from "./components/farmer/FarmerLogin";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FarmerProfile from "./pages/farmer/FarmerProfile";
import FarmerDashboard from "./components/farmer/FarmerDashboard";
import FarmerLayout from "./pages/layout/FamerLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLayout from "./pages/layout/AdminLayout";
import FarmersList from "./pages/admin/FarmersList";
import VendorPage from "./pages/VendorPage";
import AddProduct from "./pages/farmer/product/AddProduct";
import PrivateRoute from "./routes/PrivateRoutes";
import FarmerRegister from './components/farmer/FarmerRegister'
import AdminLogin from "./components/admin/AdminLogin";
import Users from "./pages/admin/Users";
import Settings from './pages/admin/Settings';
import KycRequestsList from "./pages/admin/KycRequestsList";
import ShopDetail from "./pages/farmer/shop/ShopDetail";
import AddShop from './pages/farmer/shop/AddShop'
import ProductsList from './pages/farmer/product/ProductsList'
import DeliveryPreferencePage from "./pages/farmer/DeliveryPreference";
import FarmDetail from "./pages/farmer/FarmDetail"
import CropsDetail from "./pages/farmer/CropsDetail"
import CategoryList from "./pages/admin/CategoryList";
import FarmerDetailPage from "./pages/FarmerDetailPage";


function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <PhosphorIconInit />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePageOne />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="farmers" element={<VendorPage />} />
        <Route path="product-details/:id" element={<ProductDetailsPageOne />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog-details/:id" element={<BlogDetailsPage />} />
        <Route path="farmers-shops/:shopId" element={<FarmerDetailPage />} />
        <Route path="contact" element={<ContactPage />} />

        {/* Login and Register Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />


        {/* Customer Routes */}
        <Route
          path="/checkout"
          element={
            <PrivateRoute allowedRoles={["customer"]} redirectTo="/login">
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute allowedRoles={["customer"]} redirectTo="/login">
              <AccountPage />
            </PrivateRoute>
          }
        />



        {/* Admin Routes */}

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]} redirectTo="/admin/login">
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="categories-list" element={<CategoryList />} />
          <Route path="farmers" element={<FarmersList />} />
          <Route path="kyc-requests" element={<KycRequestsList />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>


        {/* Farmer Routes */}

        <Route path="/farmer/login" element={<FarmerLogin />} />
        <Route path="/farmer/register" element={<FarmerRegister />} />

        <Route
          path="/farmer"
          element={
            <PrivateRoute allowedRoles={["farmer"]} redirectTo="login">
              <FarmerLayout />
            </PrivateRoute>
          }
        >
          <Route path="farmer-dashboard" element={<FarmerDashboard />} /> {/* Use relative path */}
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products-list" element={<ProductsList />} />
          <Route path="farmer-profile" element={<FarmerProfile />} />
          <Route path="add-shop" element={<AddShop />} />
          <Route path="shop-details" element={<ShopDetail />} />
          <Route path="delivery-preference" element={<DeliveryPreferencePage />} />
          <Route path="farm-details" element={<FarmDetail />} />
          <Route path="crops-detail" element={<CropsDetail />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
