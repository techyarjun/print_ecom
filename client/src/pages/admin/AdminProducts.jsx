import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");

      setProducts(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);

      setProducts(products.filter((p) => p._id !== id));

      alert("Product deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Admin Products</h2>

        <Link to="/admin/add-product">
          <button>Add Product</button>
        </Link>
      </div>

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={
                    product.images?.[0]
                      ? product.images[0].startsWith("http")
                        ? product.images[0]
                        : `http://localhost:5000${product.images[0]}`
                      : "https://via.placeholder.com/60"
                  }
                  alt={product.title}
                  width="60"
                  height="60"
                  style={{
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              </td>

              <td>{product.title}</td>

              <td>{product.category}</td>

              <td>₹{product.price}</td>

              <td>{product.stock}</td>

              <td>{product.featured ? "Yes" : "No"}</td>

              <td>
                <Link to={`/admin/edit-product/${product._id}`}>
                  <button>Edit</button>
                </Link>

                <button
                  onClick={() => deleteProduct(product._id)}
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
