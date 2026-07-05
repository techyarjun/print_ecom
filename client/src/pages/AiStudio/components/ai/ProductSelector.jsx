import "../../AiStyles/ProductSelector.css";

const products = [
  {
    id: 1,
    name: "T-Shirt",
    image: "/custom/tshirts.png",
  },
  {
    id: 2,
    name: "Hoodie",
    image: "/custom/hoodie.png",
  },
  {
    id: 3,
    name: "Mug",
    image: "/custom/mug.png",
  },
  {
    id: 4,
    name: "Bottle",
    image: "/custom/bottle.png",
  },
  {
    id: 5,
    name: "Phone Cover",
    image: "/custom/cover.png",
  },
  {
    id: 6,
    name: "Diary",
    image: "/custom/diary.png",
  },
  {
    id: 7,
    name: "Cap",
    image: "/custom/cap.png",
  },
  {
    id: 8,
    name: "Gift",
    image: "/custom/Gift.png",
  },
  {
    id: 9,
    name: "Polo T-Shirt",
    image: "/custom/Polo.png",
  },
  {
    id: 10,
    name: "Jersey",
    image: "/custom/jersey.png",
  },
];

function ProductSelector({
  selectedProduct,
  setSelectedProduct,
  handleStartDesign,
}) {
  return (
    <div className="product-selector">
      <div className="selector-header">
        <h2>✨ AI Design Studio</h2>

        <p>
          Select a product and start designing with AI.
        </p>
      </div>

      <div className="start-design-container">
        <button
          className="start-design-btn"
          disabled={!selectedProduct}
          onClick={handleStartDesign}
        >
          🚀 Start Designing
        </button>
      </div>

      <div className="product-grid">
        {products.map((product) => {
          const isSelected = selectedProduct?.id === product.id;

          return (
            <div
              key={product.id}
              className={`product-card ${isSelected ? "active" : ""}`}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="image-box">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <h3>{product.name}</h3>

              <button
                type="button"
                className={`select-btn ${isSelected ? "selected" : ""}`}
              >
                {isSelected ? "✓ Selected" : "Select Product"}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default ProductSelector;