import "../styles/product/ProductSkeleton.css";

function ProductSkeleton() {
  return (
    <div className="skeleton-card">

      <div className="skeleton-image shimmer"></div>

      <div className="skeleton-content">

        <div className="skeleton-title shimmer"></div>

        <div className="skeleton-subtitle shimmer"></div>

        <div className="skeleton-price shimmer"></div>

        <div className="skeleton-colors">

          <span className="shimmer"></span>
          <span className="shimmer"></span>
          <span className="shimmer"></span>
          <span className="shimmer"></span>

        </div>

        <div className="skeleton-button shimmer"></div>

      </div>

    </div>
  );
}

export default ProductSkeleton;
