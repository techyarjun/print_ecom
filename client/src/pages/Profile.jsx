import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/user/${user._id}`
      );

      setOrders(res.data);
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

  if (!user) {
    return (
      <h2 className="text-center mt-5">
        Please Login
      </h2>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Account</h2>

      {/* Profile */}
      <div className="card shadow mb-4">
        <div className="card-body">
          <h4>{user.name}</h4>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      </div>

      {/* Wallet */}
      <div className="card shadow mb-4">
        <div className="card-body">
          <h4>Wallet Balance</h4>

          <h2 className="text-success">
            ₹{user.walletBalance || 0}
          </h2>
        </div>
      </div>

      {/* Orders */}
      <div className="card shadow">
        <div className="card-body">
          <h4 className="mb-3">
            Order History
          </h4>

          {orders.length === 0 ? (
            <p>No Orders Found</p>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="border rounded p-3 mb-4"
              >
                <h6>
                  Order ID:{" "}
                  {order._id.slice(-6)}
                </h6>

                <p>
                  Amount: ₹
                  {order.totalAmount}
                </p>

                <p>
                  Status:
                  <span
                    className={`ms-2 badge ${
                      order.orderStatus ===
                      "Delivered"
                        ? "bg-success"
                        : order.orderStatus ===
                          "Cancelled"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </p>

                {order.orderStatus !==
                  "Cancelled" && (
                  <>
                    <div className="d-flex justify-content-between small fw-bold mt-3">
                      <span
                        className={
                          [
                            "Placed",
                            "Processing",
                            "Shipped",
                            "Delivered",
                          ].includes(
                            order.orderStatus
                          )
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
                          ].includes(
                            order.orderStatus
                          )
                            ? "text-success"
                            : ""
                        }
                      >
                        Processing
                      </span>

                      <span
                        className={
                          [
                            "Shipped",
                            "Delivered",
                          ].includes(
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
                          order.orderStatus ===
                          "Delivered"
                            ? "text-success"
                            : ""
                        }
                      >
                        Delivered
                      </span>
                    </div>

                    <div
                      className="progress mt-2"
                      style={{
                        height: "10px",
                      }}
                    >
                      <div
                        className="progress-bar bg-success"
                        style={{
                          width:
                            getProgressWidth(
                              order.orderStatus
                            ),
                        }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;