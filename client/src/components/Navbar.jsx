// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// function Navbar() {
//   const { cartItems } = useCart();
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));

//   const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   const token = localStorage.getItem("token");

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     navigate("/");
//     window.location.reload();
//   };

//   const linkStyle = {
//     color: "#fff",
//     textDecoration: "none",
//   };

//   return (
//     <nav
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "15px 30px",
//         background: "#222",
//         color: "#fff",
//       }}
//     >
//       <h2 style={{ margin: 0 }}>PrintStore</h2>

//       <ul
//         style={{
//           display: "flex",
//           gap: "20px",
//           listStyle: "none",
//           margin: 0,
//           padding: 0,
//           alignItems: "center",
//         }}
//       >
//         <li>
//           <Link to="/" style={linkStyle}>
//             Home
//           </Link>
//         </li>

//         <li>
//           <Link to="/products" style={linkStyle}>
//             Products
//           </Link>
//         </li>

//         {user && (
//           <li>
//             <Link to="/cart" style={linkStyle}>
//               Cart ({totalItems})
//             </Link>
//           </li>
//         )}

//         {!user ? (
//           <>
//             <li>
//               <Link to="/login" style={linkStyle}>
//                 Login
//               </Link>
//             </li>

//             <li>
//               <Link to="/register" style={linkStyle}>
//                 Register
//               </Link>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link to="/profile" style={linkStyle}>
//                 👋 {user.name}
//               </Link>
//             </li>

//             <li>
//               <button
//                 onClick={logout}
//                 style={{
//                   background: "#dc3545",
//                   color: "#fff",
//                   border: "none",
//                   padding: "8px 12px",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Logout
//               </button>
//             </li>

//             {token && (
//               <>
//                 <li>
//                   <Link to="/orders" style={linkStyle}>
//                     Orders
//                   </Link>
//                 </li>

//                 {user?.role === "admin" && (
//                   <li>
//                     <Link
//                       to="/admin"
//                       style={{
//                         ...linkStyle,
//                         background: "#0d6efd",
//                         padding: "8px 12px",
//                         borderRadius: "5px",
//                       }}
//                     >
//                       Admin Panel
//                     </Link>
//                   </li>
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// }

// // export default Navbar;
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import "../styles/navbar.css";
// import SearchBar from "./SearchBar";

// function Navbar() {
//   const navigate = useNavigate();
//   const { cartItems } = useCart();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <nav className="navbar-custom">
//       <div className="navbar-left">
//         <Link to="/" className="logo">
//           PrintStore
//         </Link>
//       </div>

//       <div className="navbar-center">
//         <SearchBar />
//       </div>

//       <div className="navbar-right">
//         <Link to="/products" className="nav-link">
//           Products
//         </Link>

//         {user && (
//           <Link to="/cart" className="cart-link">
//             Cart
//             <span className="cart-badge">{totalItems}</span>
//           </Link>
//         )}

//         {!user ? (
//           <>
//             <Link to="/login" className="nav-link">
//               Login
//             </Link>

//             <Link to="/register" className="register-btn">
//               Register
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link to="/profile" className="nav-link">
//               {user.name}
//             </Link>

//             <Link to="/orders" className="nav-link">
//               Orders
//             </Link>

//             {user.role === "admin" && (
//               <Link to="/admin" className="admin-btn">
//                 Admin
//               </Link>
//             )}

//             <button onClick={logout} className="logout-btn">
//               Logout
//             </button>

//             <Link to="/contact">Contact</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";

import { FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";

import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const user = JSON.parse(localStorage.getItem("user"));

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {/* NAVBAR */}

      <nav className="navbar-custom">
        {/* LOGO */}

        <div className="navbar-left">
          <Link to="/" className="logo">
            <img src={logo} alt="APIRA" className="logo-img" />
          </Link>
        </div>

        {/* CENTER MENU */}

        <div className="navbar-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/customize"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Customize
          </NavLink>

          <NavLink
            to="/ai-studio"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            AI Studio
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About Us
          </NavLink>
        </div>

        {/* RIGHT SIDE */}

        <div className="navbar-right">
          <SearchBar />

          {user ? (
            <Link to="/profile" className="icon-link">
              <FiUser />
            </Link>
          ) : (
            <Link to="/login" className="icon-link">
              <FiUser />
            </Link>
          )}

          <div className="icon-link">
            <FiHeart />
            <span className="icon-badge">0</span>
          </div>

          <Link to="/cart" className="icon-link">
            <FiShoppingCart />
            <span className="icon-badge">{totalItems}</span>
          </Link>

          {user && (
            <>
              <Link to="/orders" className="orders-link">
                Orders
              </Link>

              {user.role === "admin" && (
                <Link to="/admin" className="admin-btn">
                  Admin
                </Link>
              )}

              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* MOVING STRIP BELOW NAVBAR */}

      <div className="top-strip">
        <div className="marquee">
          <span>
            🚚 Free Shipping on Orders Above <b>₹999</b>
          </span>

          <span>🎨 Custom Designs. Premium Quality.</span>

          <span>
            🏷️ 10% OFF on First Order - Use Code
            <b> APIRA10</b>
          </span>

          {/* Duplicate for smooth infinite scroll */}

          <span>
            🚚 Free Shipping on Orders Above <b>₹999</b>
          </span>

          <span>🎨 Custom Designs. Premium Quality.</span>

          <span>
            🏷️ 10% OFF on First Order - Use Code
            <b> APIRA10</b>
          </span>
        </div>
      </div>
    </>
  );
}

export default Navbar;
