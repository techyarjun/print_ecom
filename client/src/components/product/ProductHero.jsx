import { Link } from "react-router-dom";
import "../styles/product/ProductHero.css";

function ProductHero() {
  return (
    <section className="product-hero">

      <div className="product-hero-overlay">

        <div className="product-hero-left">

          <span className="hero-tag">
            PREMIUM CUSTOM MERCHANDISE
          </span>

          <h1>
            Create Your
            <span> Perfect Merchandise</span>
          </h1>

          <p>
            Discover premium custom apparel, sports jerseys,
            corporate uniforms, gifts and promotional products
            crafted with high-quality printing and fast delivery
            across India.
          </p>

          <div className="hero-buttons">

            <Link
              to="/products"
              className="hero-primary-btn"
            >
              Shop Collection
            </Link>

            <Link
              to="/contact"
              className="hero-secondary-btn"
            >
              Bulk Orders
            </Link>

          </div>

          <div className="hero-features">

            <div className="hero-feature">
              <div className="feature-icon">
                🚚
              </div>

              <div>
                <h5>Free Shipping</h5>
                <span>On Orders Above ₹999</span>
              </div>
            </div>

            <div className="hero-feature">
              <div className="feature-icon">
                🎨
              </div>

              <div>
                <h5>Custom Printing</h5>
                <span>DTF | Sublimation | Vinyl</span>
              </div>
            </div>

            <div className="hero-feature">
              <div className="feature-icon">
                ⭐
              </div>

              <div>
                <h5>Premium Quality</h5>
                <span>Trusted by Businesses</span>
              </div>
            </div>

          </div>

        </div>

        <div className="product-hero-right">

          <div className="hero-image-card">

            <img
              src="/assets/hero-bg.png"
              alt="Premium Merchandise"
            />

          </div>

          <div className="floating-card top">

            <h4>1000+</h4>

            <span>Happy Customers</span>

          </div>

          <div className="floating-card bottom">

            <h4>500+</h4>

            <span>Products Available</span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProductHero;