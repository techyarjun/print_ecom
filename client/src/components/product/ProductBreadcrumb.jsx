import { Link } from "react-router-dom";
import { FiChevronRight, FiHome } from "react-icons/fi";

import "../styles/product/ProductBreadcrumb.css";

function ProductBreadcrumb({ category }) {
  return (
    <div className="product-breadcrumb">

      <Link to="/" className="breadcrumb-link">
        <FiHome />
        Home
      </Link>

      <FiChevronRight className="breadcrumb-arrow" />

      <Link to="/products" className="breadcrumb-link">
        Products
      </Link>

      {category && (
        <>
          <FiChevronRight className="breadcrumb-arrow" />

          <span className="breadcrumb-current">
            {category}
          </span>
        </>
      )}

    </div>
  );
}

export default ProductBreadcrumb;