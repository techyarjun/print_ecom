// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";
// import { getImageUrl } from "../utils/imageUrl";

// function ProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { addToCart } = useCart();

//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/products/${id}`);

//       setProduct(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleAddToCart = () => {
//     const user = localStorage.getItem("user");

//     if (!user) {
//       alert("Please login first to add products to cart.");
//       navigate("/login");
//       return;
//     }

//     addToCart(product);
//     alert("Product added to cart!");
//   };

//   if (!product) return <h2>Loading...</h2>;

//   return (
//     <div className="container mt-5">
//       <img
//         src={`http://localhost:5000${product.images?.[0]}`}
//         alt={product.title}
//       />
//       <h2>{product.title}</h2>

//       <p>{product.description}</p>

//       <h4>₹{product.price}</h4>

//       <p>Stock: {product.stock}</p>

//       <button className="btn btn-success mt-3" onClick={handleAddToCart}>
//         Add To Cart
//       </button>

//       <Link to={`/customize/${product._id}`} className="btn btn-warning">
//         Customize Product
//       </Link>
//     </div>
//   );
// }

// export default ProductDetails;



import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../utils/imageUrl";

import ProductViewer from "../components/ProductViewer";




function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `https://print-ecom-server.onrender.com/api/products/${id}`
      );

      setProduct(res.data);

      if (res.data.images?.length > 0) {
        setSelectedImage(res.data.images[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Product Images */}
        {/* Product Images + 3D Viewer */}
<div className="col-md-6">
  <div className="border rounded p-3 shadow-sm">
    <img
      src={getImageUrl(selectedImage)}
      alt={product.title}
      className="img-fluid"
      style={{
        width: "100%",
        height: "450px",
        objectFit: "contain",
      }}
    />
  </div>

  {/* Thumbnail Images */}
  <div
    className="mt-3"
    style={{
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    }}
  >
    {product.images?.map((img, index) => (
      <img
        key={index}
        src={getImageUrl(img)}
        alt={`product-${index}`}
        onClick={() => setSelectedImage(img)}
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
          cursor: "pointer",
          border:
            selectedImage === img
              ? "2px solid #2874f0"
              : "1px solid #ddd",
          borderRadius: "8px",
          padding: "2px",
        }}
      />
    ))}
  </div>

  {/* 3D Product Viewer */}
  {/* <div className="mt-4 border rounded p-2">
    <h5 className="text-center mb-3">
      3D Product Preview
    </h5>

    <ProductViewer category={product.category} />
  </div> */}
</div>

        {/* Product Details */}
        <div className="col-md-6">
          <h2>{product.title}</h2>

          <p className="text-muted">
            {product.category}
          </p>

          <h3 className="text-success">
            ₹{product.price}
          </h3>

          <p>{product.description}</p>

          <h6>
            Stock:{" "}
            {product.stock > 0
              ? product.stock
              : "Out of Stock"}
          </h6>

          <div className="d-flex gap-2 mt-4">
            <button
              className="btn btn-success"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>

            <Link
              to={`/customize/${product._id}`}
              className="btn btn-warning"
            >
              Customize Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;