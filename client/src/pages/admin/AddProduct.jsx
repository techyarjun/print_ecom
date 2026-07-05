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
  });

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [otherImages, setOtherImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadData = new FormData();

      if (frontImage) {
        uploadData.append("images", frontImage);
      }

      if (backImage) {
        uploadData.append("images", backImage);
      }

      otherImages.forEach((img) => {
        uploadData.append("images", img);
      });

      const uploadRes = await axios.post(
        "http://localhost:5000/api/upload/products-multiple",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedImages = uploadRes.data.images;

      await axios.post(
        "http://localhost:5000/api/products",
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),

          images: uploadedImages,

          customizationFront:
            uploadedImages[0] || "",

          customizationBack:
            uploadedImages[1] ||
            uploadedImages[0] ||
            "",
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
          gap: "12px",
          maxWidth: "600px",
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

        <hr />

        <h4>Product Images</h4>

        <label>
          <strong>Front Image</strong>
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFrontImage(e.target.files[0])
          }
          required
        />

        {frontImage && (
          <img
            src={URL.createObjectURL(frontImage)}
            alt="front"
            width="150"
            style={{
              borderRadius: "8px",
            }}
          />
        )}

        <label>
          <strong>Back Image</strong>
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setBackImage(e.target.files[0])
          }
          required
        />

        {backImage && (
          <img
            src={URL.createObjectURL(backImage)}
            alt="back"
            width="150"
            style={{
              borderRadius: "8px",
            }}
          />
        )}

        <label>
          <strong>Other Images</strong>
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) =>
            setOtherImages(
              Array.from(e.target.files)
            )
          }
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {otherImages.map((img, index) => (
            <img
              key={index}
              src={URL.createObjectURL(img)}
              alt={`other-${index}`}
              width="120"
              height="120"
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          ))}
        </div>

        <button
          type="submit"
          className="btn btn-dark"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;