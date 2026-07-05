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
      const res = await axios.get(
        `http://localhost:5000/api/orders/${id}`
      );

      setOrder(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProgressWidth = (status) => {
    switch (status) {
      case "Placed":
        return "25%";
      case "Processing":
        return "50%";
      case "Shipped":
        return "75%";
      case "Delivered":
        return "100%";
      default:
        return "0%";
    }
  };

  if (!order) return <h2>Loading...</h2>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Order Details</h2>

      <div className="card p-4 shadow mb-4">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>

        <p>
          <strong>Total:</strong> ₹{order.totalAmount}
        </p>

        <p>
          <strong>Status:</strong>

          <span
            className={`badge ms-2 ${
              order.orderStatus === "Delivered"
                ? "bg-success"
                : order.orderStatus === "Cancelled"
                ? "bg-danger"
                : "bg-warning text-dark"
            }`}
          >
            {order.orderStatus}
          </span>
        </p>

        {order.orderStatus !== "Cancelled" && (
          <>
            <div className="d-flex justify-content-between small fw-bold mt-4">
              <span
                className={
                  [
                    "Placed",
                    "Processing",
                    "Shipped",
                    "Delivered",
                  ].includes(order.orderStatus)
                    ? "text-success"
                    : ""
                }
              >
                Placed
              </span>

              <span
                className={
                  [
                    "Processing",
                    "Shipped",
                    "Delivered",
                  ].includes(order.orderStatus)
                    ? "text-success"
                    : ""
                }
              >
                Processing
              </span>

              <span
                className={
                  ["Shipped", "Delivered"].includes(
                    order.orderStatus
                  )
                    ? "text-success"
                    : ""
                }
              >
                Shipped
              </span>

              <span
                className={
                  order.orderStatus === "Delivered"
                    ? "text-success"
                    : ""
                }
              >
                Delivered
              </span>
            </div>

            <div
              className="progress mt-2"
              style={{ height: "12px" }}
            >
              <div
                className="progress-bar bg-success"
                style={{
                  width: getProgressWidth(
                    order.orderStatus
                  ),
                }}
              ></div>
            </div>
          </>
        )}
      </div>

      <h4>Shipping Address</h4>

      <div className="card p-3 mb-4">
        <h5>
          {order.shippingAddress?.fullName}
        </h5>

        <p>{order.shippingAddress?.phone}</p>

        <p>
          {order.shippingAddress?.address},
          {order.shippingAddress?.city},
          {order.shippingAddress?.state} -
          {order.shippingAddress?.pincode}
        </p>
      </div>

      <h4>Products</h4>

      {order.products?.map((item) => (
        <div
          key={item._id}
          className="card mb-3 p-3"
        >
          <h5>{item.product?.title}</h5>

          <p>Quantity: {item.quantity}</p>

          <p>Price: ₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderDetails;