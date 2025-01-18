import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <PhosphorIconInit />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePageOne />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/farmers" element={<VendorPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPageOne />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog-details" element={<BlogDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Login and Register Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/farmer/login" element={<FarmerLogin />} />
        <Route path="/farmer/register" element={<FarmerRegister />} />

        <Route path="/admin/login" element={<AdminLogin />} /> {/* Admin login */}

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
          <Route path="farmers" element={<FarmersList />} />
          <Route path="kyc-requests" element={<KycRequestsList />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>


        {/* Farmer Routes */}
        <Route
          path="/farmer"
          element={
            <PrivateRoute allowedRoles={["farmer"]} redirectTo="/farmer/login">
              <FarmerLayout />
            </PrivateRoute>
          }
        >
          <Route path="farmer-dashboard" element={<FarmerDashboard />} /> {/* Use relative path */}
          <Route path="add-product" element={<AddProduct />} />
          <Route path="farmer-profile" element={<FarmerProfile />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
