import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminOrders from "./pages/AdminOrders";
// import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="min-vh-100">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* User Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />

          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
