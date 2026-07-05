import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import "../../styles/Customize.css";
import CustomizePage from "../../components/CustomizePage";

const categories = [
  {
    title: "Sports Jerseys",
    image: "/custom/jersey.png",
    description: "Cricket, Football, Kabaddi, Volleyball & more",
    path: "/customize/jerseys",
  },
  {
    title: "T-Shirts",
    image: "/custom/tshirts.png", // Change if your filename is different
    description: "Round Neck, Polo & Oversized",
    path: "/customize/tshirts",
  },
  {
    title: "Hoodies",
    image: "/custom/hoodie.png",
    description: "Premium Hoodies & Sweatshirts",
    path: "/customize/hoodies",
  },
  {
    title: "Corporate Uniforms",
    image: "/custom/Polo.png",
    description: "Office, Staff & Company Wear",
    path: "/customize/uniforms",
  },
  {
    title: "Gift Sets",
    image: "/custom/Gift.png",
    description: "Corporate & Event Gifts",
    path: "/customize/gifts",
  },
  {
    title: "Mugs",
    image: "/custom/mug.png",
    description: "Photo & Logo Printed",
    path: "/customize/mugs",
  },
  {
    title: "Phone Covers",
    image: "/custom/cover.png",
    description: "Personalized Mobile Covers",
    path: "/customize/covers",
  },
  {
    title: "Diaries",
    image: "/custom/diary.png",
    description: "Custom Branding",
    path: "/customize/diaries",
  },
  {
    title: "Bags",
    image: "/custom/bag.png",
    description: "Laptop & Travel Bags",
    path: "/customize/bags",
  },
  {
    title: "Caps",
    image: "/custom/cap.png",
    description: "Embroidery & Printing",
    path: "/customize/caps",
  },
  {
    title: "Water Bottles",
    image: "/custom/bottle.png",
    description: "Steel & Sports Bottles",
    path: "/customize/bottles",
  },
  {
    title: "Stickers & Labels",
    image: "/custom/custom.png",
    description: "Custom Stickers, Tags & Labels",
    path: "/customize/stickers",
  },
];

export default function Customize() {
  return (
    <>
      <CustomizePage />

      <div className="customize-page">
        {/* <section className="customize-hero">
          <span>CREATE YOUR OWN</span>

          <h1>
            Customize Products
            <br />
            Exactly the Way You Want
          </h1>

          <p>
            Select a product category to start designing with your own
            logo, name, image or artwork.
          </p>
        </section> */}

        <section className="category-grid">
          {categories.map((item) => (
            <Link
              to={item.path}
              key={item.title}
              className="category-card"
            >
              <div className="category-image">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <span className="category-btn">
                Start Designing
                <FiArrowRight />
              </span>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}