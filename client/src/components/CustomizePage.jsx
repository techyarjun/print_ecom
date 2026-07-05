import { Link } from "react-router-dom";
import "./styles/CustomizePage.css";

function CustomizePage() {
  return (
    <section className="custom-banner">
      <div className="custom-container">

        <div className="custom-left">
          <img
            src="/custom/Customleft.png"
            alt="Custom Products"
          />
        </div>

        <div className="custom-content">
          <span className="custom-subtitle">
            CREATE YOUR OWN
          </span>

          <h1>
            Customize Products
            <br />
            <span>
              Exactly the Way <strong>You Want</strong>
            </span>
          </h1>

          <p>
            Choose a product category and start designing with your
            own logo, name, image or artwork.
          </p>

          <div className="custom-buttons">
            <Link to="/customize" className="primary-btn">
              Start Designing
            </Link>

            <Link to="/products" className="secondary-btn">
              Browse Products
            </Link>
          </div>
        </div>

        <div className="custom-right">
          <img
            src="/custom/Customright.png"
            alt="Custom Design"
          />
        </div>

      </div>
    </section>
  );
}

export default CustomizePage;