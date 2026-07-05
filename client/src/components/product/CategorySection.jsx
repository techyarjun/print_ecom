import "../styles/product/CategorySection.css";

const categories = [
  { title: "All Products", value: "" },
  { title: "T-Shirts", value: "Clothing" },
  { title: "Hoodies", value: "Hoodie" },
  { title: "Jerseys", value: "Jersey" },
  { title: "Mugs", value: "Mug" },
  { title: "Bottles", value: "Bottle" },
  { title: "Accessories", value: "Accessory" },
];

function CategorySection({ category, setCategory }) {
  return (
    <section className="category-section">

      {/*  */}

      <div className="category-list">

        {categories.map((item) => (
          <button
            key={item.title}
            onClick={() => setCategory(item.value)}
            className={
              category === item.value
                ? "category-btn active"
                : "category-btn"
            }
          >
            {item.title}
          </button>
        ))}

      </div>

    </section>
  );
}

export default CategorySection;