import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#222",
        color: "#fff",
      }}
    >
      <h2 style={{ margin: 0 }}>PrintStore</h2>

      <ul
        style={{
          display: "flex",
          gap: "20px",
          listStyle: "none",
          margin: 0,
          padding: 0,
          alignItems: "center",
        }}
      >
        <li>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/products" style={linkStyle}>
            Products
          </Link>
        </li>

        {user && (
          <li>
            <Link to="/cart" style={linkStyle}>
              Cart ({totalItems})
            </Link>
          </li>
        )}

        {!user ? (
          <>
            <li>
              <Link to="/login" style={linkStyle}>
                Login
              </Link>
            </li>

            <li>
              <Link to="/register" style={linkStyle}>
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/profile" style={linkStyle}>
                👋 {user.name}
              </Link>
            </li>

            <li>
              <button
                onClick={logout}
                style={{
                  background: "#dc3545",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
