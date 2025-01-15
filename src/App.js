import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import HomePageOne from "./pages/HomePageOne";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPageOne from "./pages/ProductDetailsPageOne";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FarmerProfile from "./pages/farmer/FarmerProfile"
import FarmerDashboard from "./components/farmer/FarmerDashboard";
import FarmerLayout from "./pages/layout/FamerLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLayout from "./pages/layout/AdminLayout"
import AddFarmer from "./pages/admin/AddFarmer";
import FarmerList from "./pages/admin/FarmerList"

function App() {

  const userRole = "farmer";

  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <PhosphorIconInit />

      <Routes>
        <Route exact path="/" element={<HomePageOne />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/shop" element={<ShopPage />} />
        <Route exact path="/product-details/:id" element={<ProductDetailsPageOne />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/checkout" element={<CheckoutPage />} />
        <Route exact path="/account" element={<AccountPage />} />
        <Route exact path="/blog" element={<BlogPage />} />
        <Route exact path="/blog-details" element={<BlogDetailsPage />} />
        <Route exact path="/contact" element={<ContactPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-farmer" element={<AddFarmer />} />
          <Route path="farmers" element={<FarmerList />} />
        </Route>

        {/* Farmer Admin Routes */}
        <Route path="/farmer" element={<FarmerLayout />}>
          <Route index element={<FarmerDashboard />} />
          <Route path="dashboard" element={<FarmerDashboard />} />
          <Route path="farmer-profile" element={<FarmerProfile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
