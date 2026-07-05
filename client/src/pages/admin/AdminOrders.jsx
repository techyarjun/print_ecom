import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [customOrders, setCustomOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchCustomOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/orders");

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/custom-orders",
      );

      setCustomOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/orders/admin/${id}`,
        {
          orderStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Order Management</h2>

      {/* NORMAL ORDERS */}
      <div className="card p-3 mb-5">
        <h4>Normal Orders</h4>

        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Items</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.user?.name}
                  <br />
                  {order.user?.email}
                </td>

                <td>₹{order.totalAmount}</td>

                <td>{order.orderStatus}</td>

                <td>{order.products?.length}</td>

                <td>
                  <select
                    value={order.orderStatus}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CUSTOM ORDERS */}
      <div className="card p-3">
        <h4>Custom Orders</h4>

        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Product</th>
              <th>Front Preview</th>
              <th>Back Preview</th>
              <th>Name</th>
              <th>Slogan</th>
              <th>Color</th>
              <th>Size</th>
              <th>Qty</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {customOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.product?.title}</td>

                <td>
                  {order.frontPreviewImage ? (
                    <img
                      src={order.frontPreviewImage}
                      alt="front-preview"
                      width="120"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    />
                  ) : (
                    "No Front Preview"
                  )}
                </td>

                <td>
                  {order.backPreviewImage ? (
                    <img
                      src={order.backPreviewImage}
                      alt="back-preview"
                      width="120"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    />
                  ) : (
                    "No Back Preview"
                  )}
                </td>

                <td>{order.backName}</td>

                <td>{order.slogan}</td>

                <td>{order.color}</td>

                <td>{order.size}</td>

                <td>{order.quantity}</td>

                <td>
                  <span className="badge bg-primary">{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
