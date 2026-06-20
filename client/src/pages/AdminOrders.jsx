import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/orders"
      );

      setOrders(data);
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
        }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Order Management</h2>

      <table className="table table-bordered mt-4">
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

              <td>{order.products.length}</td>

              <td>
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
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
  );
}

export default AdminOrders;