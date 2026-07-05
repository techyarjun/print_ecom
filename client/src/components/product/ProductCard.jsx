import { Link, useNavigate } from "react-router-dom";
import {
  FiHeart,
  FiShoppingCart,
  FiEye,
  FiStar,
} from "react-icons/fi";
import { getImageUrl } from "../../utils/imageUrl";
import "../styles/product/ProductCard.css";
import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const oldPrice = Math.round(product.price * 1.25);
  const discount = Math.round(
    ((oldPrice - product.price) / oldPrice) * 100
  );

  const handleAddToCart = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first to add products to cart.");
      navigate("/login");
      return;
    }

    addToCart(product);
    alert("Product added to cart!");
  };



  return (
    <div className="product-card">

      {discount > 0 && (
        <span className="discount-badge">
          {discount}% OFF
        </span>
      )}

      <button className="wishlist-btn">
        <FiHeart />
      </button>

      <Link
        to={`/product/${product._id}`}
        className="product-image"
      >
        <img
          src={getImageUrl(product.images?.[0])}
          alt={product.title}
        />
      </Link>

      <div className="product-body">

        <span className="product-brand">
          {product.category}
        </span>

        <Link
          to={`/product/${product._id}`}
          className="product-title"
        >
          {product.title}
        </Link>

        <div className="rating-row">

          <span className="rating">
            <FiStar />
            4.5
          </span>

          <span className="rating-count">
            (254)
          </span>

        </div>

        <div className="price-row">

          <span className="price">
            ₹{product.price}
          </span>

          <span className="old-price">
            ₹{oldPrice}
          </span>

          <span className="discount">
            {discount}% off
          </span>

        </div>

        <p className="delivery">
          Free Delivery
        </p>

        <div className="product-buttons">

          <button
            onClick={handleAddToCart}
            className="cart-btn"
          >
            <FiShoppingCart />
              <span>Add to Cart</span>
          </button>


        </div>

      </div>

    </div>
  );
}

export default ProductCard;