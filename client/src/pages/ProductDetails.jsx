import axios from "axios";
import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert(
        "Please login first to add products to cart."
      );
      navigate("/login");
      return;
    }

    addToCart(product);
    alert("Product added to cart!");
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="container mt-5">
      <img
        src={product.images?.[0]}
        alt={product.title}
        width="300"
      />

      <h2>{product.title}</h2>

      <p>{product.description}</p>

      <h4>₹{product.price}</h4>

      <p>Stock: {product.stock}</p>

      <button
        className="btn btn-success mt-3"
        onClick={handleAddToCart}
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ProductDetails;