import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/${id}`);

      setOrder(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!order) return <h2>Loading...</h2>;

  return (
    <div className="container py-5">
      <h2>Order Details</h2>

      <p>
        <strong>Order ID:</strong> {order._id}
      </p>

      <p>
        <strong>Total:</strong> ₹{order.totalAmount}
      </p>

      <p>
        <strong>Status:</strong> {order.status}
      </p>

      <h4>Shipping Address</h4>

      <div className="card p-3 mb-3">
        <h5>{order.shippingAddress?.fullName}</h5>

        <p>{order.shippingAddress?.phone}</p>

        <p>
          {order.shippingAddress?.address},{order.shippingAddress?.city},
          {order.shippingAddress?.state} -{order.shippingAddress?.pincode}
        </p>
      </div>

      <h4>Products</h4>

      {order.products?.map((item) => (
        <div key={item._id} className="card mb-3 p-3">
          <h5>{item.product?.title}</h5>

          <p>Quantity: {item.quantity}</p>

          <p>Price: ₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderDetails;
