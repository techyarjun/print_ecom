import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiPackage,
  FiMapPin,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiEdit2,
  FiMail,
  FiPhone,
  FiArrowRight,
  FiPlus,
} from "react-icons/fi";

import "../styles/Profile.css";
//check if working
const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const personalInfoRef = useRef(null);
  const ordersRef = useRef(null);
  const addressRef = useRef(null);
  const walletRef = useRef(null);

  const token = localStorage.getItem("token");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);

      // Get user from localStorage first
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      // Get user orders
      if (token) {
        const orderResponse = await axios.get(
          `${API_URL}/api/orders/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(
          Array.isArray(orderResponse.data)
            ? orderResponse.data
            : orderResponse.data.orders || []
        );
      }
    } catch (error) {
      console.error(
        "Profile loading error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const recentOrders = useMemo(() => {
    return orders.slice(0, 4);
  }, [orders]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const editProfileHandler = () => {
    personalInfoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const ordersHandler = () => {
    navigate("/orders");
  };

  const addressesHandler = () => {
    navigate("/addresses");
  };

  const walletHandler = () => {
    navigate("/wallet");
  };

  const settingsHandler = () => {
    navigate("/settings");
  };

  const addAddressHandler = () => {
    navigate("/addresses");
  };

  const addMoneyHandler = () => {
    navigate("/wallet");
  };

  const viewTransactionsHandler = () => {
    navigate("/wallet");
  };

  const getInitial = () => {
    if (!user?.name) return "U";

    return user.name.charAt(0).toUpperCase();
  };

  const getOrderStatusClass = (status) => {
    const value = status?.toLowerCase();

    if (value === "delivered") return "status-delivered";
    if (value === "shipped") return "status-shipped";
    if (value === "cancelled") return "status-cancelled";

    return "status-processing";
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="profile-page-loader">
        <div className="profile-loader"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="customer-profile-page">
      <div className="customer-profile-layout">

        {/* ================= SIDEBAR ================= */}

        <aside className="customer-profile-sidebar">
          <div className="profile-sidebar-user">
            <div className="profile-sidebar-avatar">
              {getInitial()}
            </div>

            <span>Hello,</span>

            <h2>{user?.name || "User"}</h2>
          </div>

          <div className="profile-sidebar-menu">
            <button className="profile-menu-item active" onClick={editProfileHandler}>
              <FiUser />
              <span>My Profile</span>
            </button>

            <button className="profile-menu-item" onClick={ordersHandler}>
              <FiPackage />
              <span>My Orders</span>
            </button>

            <button className="profile-menu-item" onClick={addressesHandler}>
              <FiMapPin />
              <span>Addresses</span>
            </button>

            <button className="profile-menu-item" onClick={walletHandler}>
              <FiCreditCard />
              <span>Wallet</span>
            </button>

            <button className="profile-menu-item" onClick={settingsHandler}>
              <FiSettings />
              <span>Settings</span>
            </button>

            <div className="profile-menu-divider"></div>

            <button
              className="profile-menu-item logout"
              onClick={logoutHandler}
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </aside>


        {/* ================= MAIN CONTENT ================= */}

        <main className="customer-profile-main">

          {/* PERSONAL INFORMATION */}

          <section
            className="profile-dashboard-card personal-info-section"
            ref={personalInfoRef}
          >
            <div className="profile-section-header">
              <div>
                <h1>Personal Information</h1>
                <p>Manage your personal information</p>
              </div>

              <button className="profile-dark-button" onClick={() => navigate("/profile/edit") }>
                <FiEdit2 />
                Edit Profile
              </button>
            </div>

            <div className="personal-info-grid">

              <div className="personal-info-card">
                <div className="personal-info-icon orange">
                  <FiUser />
                </div>

                <div>
                  <span>Full Name</span>
                  <h3>{user?.name || "Not available"}</h3>
                </div>
              </div>


              <div className="personal-info-card">
                <div className="personal-info-icon peach">
                  <FiMail />
                </div>

                <div>
                  <span>Email Address</span>
                  <h3>{user?.email || "Not available"}</h3>
                </div>
              </div>


              <div className="personal-info-card">
                <div className="personal-info-icon purple">
                  <FiPhone />
                </div>

                <div>
                  <span>Phone Number</span>
                  <h3>{user?.phone || "Not added"}</h3>
                </div>
              </div>

            </div>
          </section>


          {/* ================= ORDERS ================= */}

          <section
            className="profile-dashboard-card orders-section"
            ref={ordersRef}
          >
            <div className="profile-section-header">
              <div>
                <h1>My Orders</h1>
                <p>View and track your recent orders</p>
              </div>

              <button
                className="profile-text-button"
                onClick={ordersHandler}
              >
                View All Orders
                <FiArrowRight />
              </button>
            </div>


            {recentOrders.length > 0 ? (
              <div className="profile-orders-table-wrapper">
                <table className="profile-orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order._id}>
                        <td>
                          #
                          {order._id
                            ?.slice(-8)
                            .toUpperCase()}
                        </td>

                        <td>
                          {formatDate(order.createdAt)}
                        </td>

                        <td>
                          ₹
                          {Number(
                            order.totalAmount || 0
                          ).toLocaleString("en-IN")}
                        </td>

                        <td>
                          <span
                            className={`profile-order-status ${getOrderStatusClass(
                              order.status
                            )}`}
                          >
                            {order.status || "Processing"}
                          </span>
                        </td>

                        <td>
                          <button
                            className="order-view-button"
                            onClick={() =>
                              navigate(`/order/${order._id}`)
                            }
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="profile-no-orders">
                <FiPackage />
                <div>
                  <h3>No orders yet</h3>
                  <p>
                    Your recent orders will appear here.
                  </p>
                </div>
              </div>
            )}
          </section>


          {/* ================= BOTTOM GRID ================= */}

          <div className="profile-bottom-grid">

            {/* SAVED ADDRESS */}

            <section
              className="profile-dashboard-card address-section"
              ref={addressRef}
            >
              <div className="profile-section-header">
                <div>
                  <h1>Saved Addresses</h1>
                  <p>Manage your delivery addresses</p>
                </div>

                <button className="address-add-text" onClick={addAddressHandler}>
                  Add New
                </button>
              </div>

              <div className="address-empty-box">
                <div className="address-location-icon">
                  <FiMapPin />
                </div>

                <div className="address-empty-content">
                  <h3>No saved addresses yet</h3>
                  <p>
                    Add an address for faster checkout.
                  </p>

                  <button className="orange-add-address-button" onClick={addAddressHandler}>
                    <FiPlus />
                    Add Address
                  </button>
                </div>
              </div>
            </section>


            {/* WALLET */}

            <section
              className="profile-dashboard-card wallet-section"
              ref={walletRef}
            >
              <div className="profile-section-header">
                <div>
                  <h1>Wallet</h1>
                  <p>
                    View your wallet balance and transactions
                  </p>
                </div>
              </div>

              <div className="profile-wallet-balance">
                <div>
                  <span>Available Balance</span>

                  <h2>
                    ₹
                    {Number(
                      user?.walletBalance || 0
                    ).toLocaleString("en-IN")}
                  </h2>
                </div>

                <div className="wallet-large-icon">
                  <FiCreditCard />
                </div>
              </div>

              <div className="wallet-actions">
                <button className="wallet-add-button" onClick={addMoneyHandler}>
                  Add Money
                </button>

                <button className="wallet-transaction-button" onClick={viewTransactionsHandler}>
                  View Transactions
                </button>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;