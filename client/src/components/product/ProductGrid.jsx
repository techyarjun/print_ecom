import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import ProductPagination from "./ProductPagination";

import { FiPackage } from "react-icons/fi";

import "../styles/product/ProductGrid.css";

function ProductGrid({
  products,
  loading,
  view,
  currentPage,
  totalPages,
  setCurrentPage,
}) {

  if (loading) {
    return (
      <section className="products-wrapper">

        <div className="products-grid">

          {[...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}

        </div>

      </section>
    );
  }

  if (!loading && products.length === 0) {

    return (

      <section className="empty-products">

        <img
          src="/images/empty.png"
          alt="No Products"
        />

        <h2>No Products Found</h2>

        <p>
          Try adjusting your filters or search keywords.
        </p>

      </section>

    );

  }

  return (

    <section className="products-wrapper">

      <div className="products-header">

        <div>

          <h2>

            <FiPackage />

            Premium Collection

          </h2>

          <p>

            Showing
            <strong> {products.length} </strong>
            premium products

          </p>

        </div>

      </div>

      <div
        className={
          view === "list"
            ? "products-list"
            : "products-grid"
        }
      >

        {products.map(product => (

          <ProductCard
            key={product._id}
            product={product}
          />

        ))}

      </div>

      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

    </section>

  );

}

export default ProductGrid;