import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/AdminDashboard.css";


function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN =", token);

      const { data } = await axios.get(
        "https://print-ecom-server.onrender.com/api/admin/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };
  //   {
  //     $group: {
  //       _id: null,
  //       totalRevenue: {
  //         $sum: "$totalAmount",
  //       },
  //     },
  //   },
  // ]);

  // const revenue =
  //   revenueData.length > 0
  //     ? revenueData[0].totalRevenue
  //     : 0;

  // res.status(200).json({
  //   products,
  //   orders,
  //   users,
  //   revenue,
  // });

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card shadow p-4 text-center">
            <h1>{stats.products}</h1>
            <h5>Total Products</h5>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4 text-center">
            <h1>{stats.orders}</h1>
            <h5>Total Orders</h5>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4 text-center">
            <h1>{stats.users}</h1>
            <h5>Total Users</h5>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-4 text-center">
            <h1>₹{stats.revenue}</h1>
            <h5>Total Revenue</h5>
          </div>
        </div>

        <Link to="/admin/orders" className="btn btn-primary mt-3">
          Manage Orders
        </Link>

        <Link to="/admin/products" className="btn btn-success">
          + Add Product
        </Link>

        <li>
          <Link to="/admin/contacts" className="admin-card">
            <h3>📩 Contact Messages</h3>
            <p>View and manage customer inquiries</p>
          </Link>
        </li>
      </div>
    </div>
  );
}

export default AdminDashboard;
