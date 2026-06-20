import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setFormData({
        title: res.data.title || "",
        description: res.data.description || "",
        category: res.data.category || "",
        price: res.data.price || "",
        stock: res.data.stock || "",
        image: res.data.images?.[0] || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),
          images: [formData.image],
        }
      );

      alert("Product Updated Successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Product</h2>

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
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
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
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;