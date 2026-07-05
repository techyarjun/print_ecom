// import { BrowserRouter, Routes, Route } from "react-router-dom";

// // Layout Components
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// // Pages
// import Home from "./pages/Home";
// import Products from "./pages/Products";
// import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile";
// import Checkout from "./pages/Checkout";
// import Orders from "./pages/Orders";
// import OrderDetails from "./pages/OrderDetails";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminProducts from "./pages/admin/AdminProducts";
// import AddProduct from "./pages/admin/AddProduct";
// import EditProduct from "./pages/EditProduct";
// import AdminOrders from "./pages/admin/AdminOrders";
// import CustomizeProduct from "./pages/customize/CustomizeProduct";
// import CustomOrders from "./pages/admin/CustomOrders";
// import Contact from "./pages/Contact";
// import AdminContacts from "./pages/admin/AdminContacts";
// import ProductCustomizer from "./pages/customProduct/ProductCustomizer";
// import Customize from "./pages/customProduct/Customize";
// import AIStudio from "./pages/AiStudio/AIStudio";
// import Editor from "./pages/AiStudio/Editor";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <main className="min-vh-100">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/product/:id" element={<ProductDetails />} />

//           {/* User Routes */}
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/orders/:id" element={<OrderDetails />} />

//           {/* Authentication Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           <Route path="/admin" element={<AdminDashboard />} />
//           <Route path="/admin/products" element={<AdminProducts />} />

//           <Route path="/admin/add-product" element={<AddProduct />} />
//           <Route path="/admin/edit-product/:id" element={<EditProduct />} />
//           <Route path="/admin/orders" element={<AdminOrders />} />

//           <Route path="/customize/:id" element={<CustomizeProduct />} />
//           <Route path="/admin/custom-orders" element={<CustomOrders />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/admin/contacts" element={<AdminContacts />} />
//           <Route path="/customizer" element={<ProductCustomizer />} />

//           <Route path="/Customize" element={<Customize/>} />
//           <Route path="/ai-studio" element={<AIStudio />} />
//           <Route path="/ai-studio/editor" element={<Editor />} />
//         </Routes>
//       </main>

//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatbotWidget from "./components/ChatbotWidget";

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

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminOrders from "./pages/admin/AdminOrders";

import CustomizeProduct from "./pages/customize/CustomizeProduct";
import CustomOrders from "./pages/admin/CustomOrders";

import Contact from "./pages/Contact";
import AdminContacts from "./pages/admin/AdminContacts";

import ProductCustomizer from "./pages/customProduct/ProductCustomizer";
import Customize from "./pages/customProduct/Customize";

import AIStudio from "./pages/AiStudio/AIStudio";
import Editor from "./pages/AiStudio/Editor";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main className="min-vh-100">

        <Routes>

          {/* Public Routes */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />


          {/* User Routes */}

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/orders/:id"
            element={<OrderDetails />}
          />


          {/* Authentication Routes */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* Admin Routes */}

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/products"
            element={<AdminProducts />}
          />

          <Route
            path="/admin/add-product"
            element={<AddProduct />}
          />

          <Route
            path="/admin/edit-product/:id"
            element={<EditProduct />}
          />

          <Route
            path="/admin/orders"
            element={<AdminOrders />}
          />

          <Route
            path="/admin/custom-orders"
            element={<CustomOrders />}
          />

          <Route
            path="/admin/contacts"
            element={<AdminContacts />}
          />


          {/* Customization Routes */}

          <Route
            path="/customize/:id"
            element={<CustomizeProduct />}
          />

          <Route
            path="/customizer"
            element={<ProductCustomizer />}
          />

          <Route
            path="/Customize"
            element={<Customize />}
          />


          {/* Contact */}

          <Route
            path="/contact"
            element={<Contact />}
          />


          {/* AI Studio */}

          <Route
            path="/ai-studio"
            element={<AIStudio />}
          />

          <Route
            path="/ai-studio/editor"
            element={<Editor />}
          />

        </Routes>

      </main>

      <Footer />

      {/* Global Floating AI Chatbot */}
      <ChatbotWidget />

    </BrowserRouter>
  );
}

export default App;