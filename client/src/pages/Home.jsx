import "../styles/home.css";
import { useNavigate } from "react-router-dom";import ProductHero from "../components/product/ProductHero";

const Home = () => {
  const navigate = useNavigate();

  return (
  <>
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>
            Create It.
            <br />
            <span>Wear It.</span>
          </h1>

          <p>
            Premium custom merchandise
            <br />
            made just for you.
          </p>

          <div className="hero-buttons">
            <button
              className="shop-btn"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>

            <button
              className="custom-btn"
              onClick={() => navigate("/customize")}
            >
              Customize
            </button>
          </div>
        </div>

        <div className="hero-products">
          <img src="/images/prdct.png" alt="Products" />
        </div>
      </div>
    </section>

    </>
  );
};

export default Home;
