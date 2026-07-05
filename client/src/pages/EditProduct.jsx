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

  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await axios.put(`http://localhost:5000/api/products/${id}`, {
  //       title: formData.title,
  //       description: formData.description,
  //       category: formData.category,
  //       price: Number(formData.price),
  //       stock: Number(formData.stock),
  //       images: [formData.image],
  //     });

  //     alert("Product Updated Successfully");
  //     navigate("/admin/products");
  //   } catch (error) {
  //     console.log(error);
  //     alert("Update failed");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadedImages = formData.images;

      if (newImages.length > 0) {
        const uploadData = new FormData();

        newImages.forEach((image) => {
          uploadData.append("images", image);
        });

        const uploadRes = await axios.post(
          "http://localhost:5000/api/upload/products-multiple",
          uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        uploadedImages = uploadRes.data.images;
      }

      await axios.put(`http://localhost:5000/api/products/${id}`, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: uploadedImages,
      });

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
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setNewImages(Array.from(e.target.files))}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {formData.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              width="100"
              height="100"
              style={{
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ))}
        </div>

        {newImages.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {newImages.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt=""
                width="100"
                height="100"
                style={{
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ))}
          </div>
        )}

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
