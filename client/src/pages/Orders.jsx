import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://print-ecom-server.onrender.com/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card mb-3 p-3">
            <h5>Order ID: {order._id}</h5>

            <p>Total Amount: ₹{order.totalAmount}</p>

            <p>Status: {order.orderStatus}</p>

            <ul>
              {order.products?.map((item, index) => (
                <li key={index}>
                  {item.title} x {item.quantity}
                </li>
              ))}
            </ul>
            <Link to={`/orders/${order._id}`} className="btn btn-primary">
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
