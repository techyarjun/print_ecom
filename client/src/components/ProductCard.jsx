function ProductCard({ image, name, price }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        width: "250px",
      }}
    >
      <img
        src={image}
        alt={name}
        width="100%"
        height="200"
      />

      <h3>{name}</h3>

      <p>₹{price}</p>

      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;