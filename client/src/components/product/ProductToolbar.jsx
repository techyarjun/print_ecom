import { FiSearch, FiGrid, FiList } from "react-icons/fi";
import "../styles/product/ProductToolbar.css";

function ProductToolbar({
  keyword,
  products,
  sort,
  setSort,
  view,
  setView,
}) {
  return (
    <section className="product-toolbar">

      <div className="toolbar-left">

        <h2>Premium Merchandise</h2>

        <p>
          Showing <strong>{products.length}</strong> Products

          {keyword && (
            <>
              {" "}
              | Search :
              <strong> {keyword}</strong>
            </>
          )}

        </p>

      </div>

      <div className="toolbar-right">

        <div className="search-info">

          <FiSearch />

          <span>
            Find Your Perfect Product
          </span>

        </div>

        <select
          className="sort-dropdown"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >

          <option value="">Popularity</option>

          <option value="low">
            Price : Low to High
          </option>

          <option value="high">
            Price : High to Low
          </option>

          <option value="newest">
            Newest First
          </option>

        </select>

        <div className="view-switch">

          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            <FiGrid />
          </button>

          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            <FiList />
          </button>

        </div>

      </div>

    </section>
  );
}

export default ProductToolbar;