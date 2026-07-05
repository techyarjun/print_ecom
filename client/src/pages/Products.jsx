import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import BannerSlider from "../components/BannerSlider";

import ProductHero from "../components/product/ProductHero";
import ProductBreadcrumb from "../components/product/ProductBreadcrumb";
import CategorySection from "../components/product/CategorySection";
import ProductToolbar from "../components/product/ProductToolbar";
import ProductSidebar from "../components/product/ProductSidebar";
import ProductGrid from "../components/product/ProductGrid";

// import BulkOrderCTA from "../components/common/BulkOrderCTA";
// import FeatureSection from "../components/common/FeatureSection";
// import Newsletter from "../components/common/Newsletter";

import "../styles/Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("search") || "";

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const [view, setView] = useState("grid");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  useEffect(() => {
    fetchProducts();
  }, [keyword, category, sort, priceRange]);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://print-ecom-server.onrender.com/api/products?search=${keyword}&category=${category}&sort=${sort}&price=${priceRange}`,
      );

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setCategory("");
    setSort("");
    setPriceRange("");
    setCurrentPage(1);
  };

  // Pagination

  const indexOfLast = currentPage * productsPerPage;

  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <BannerSlider />


      <div className="products-page">
        {/* <ProductHero /> */}

        <div className="products-wrapper">
            <ProductBreadcrumb category={category} />


          <CategorySection category={category} setCategory={setCategory} />

          <div className="products-layout">
            <ProductSidebar
              category={category}
              setCategory={setCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              clearFilters={clearFilters}
            />

            <div className="products-content">
              {/* <ProductToolbar
                keyword={keyword}
                products={products}
                sort={sort}
                setSort={setSort}
                view={view}
                setView={setView}
              /> */}

              <ProductGrid
                loading={loading}
                products={currentProducts}
                view={view}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>

          {/* Uncomment after creating */}

          {/*
          <BulkOrderCTA />

          <FeatureSection />

          <Newsletter />
          */}
        </div>
      </div>
    </>
  );
}

export default Products;
