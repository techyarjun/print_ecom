import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Mug",
    price: "",
    stock: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),
          images: [formData.image],
        }
      );

      alert("Product Added Successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Product</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "500px",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option>Clothing</option>
          <option>Bottle</option>
          <option>Diary</option>
          <option>Accessory</option>
          <option>Mug</option>
          <option>Phone Cover</option>
          <option>Other</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;