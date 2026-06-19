import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm">

      <img
        src={
          product.images?.[0] ||
          "https://via.placeholder.com/300"
        }
        className="card-img-top"
        alt={product.title}
      />

      <div className="card-body">
        <h5>{product.title}</h5>

        <p>
          {product.description?.substring(0, 80)}
          ...
        </p>

        <h6>₹{product.price}</h6>

        <Link
          to={`/product/${product._id}`}
          className="btn btn-dark"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;