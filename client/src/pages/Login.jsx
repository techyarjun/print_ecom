import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2563eb 100%)",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "420px",
      background: "#fff",
      padding: "35px",
      borderRadius: "18px",
      boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
    },
    title: {
      textAlign: "center",
      marginBottom: "10px",
      color: "#1e293b",
    },
    subtitle: {
      textAlign: "center",
      color: "#64748b",
      marginBottom: "25px",
    },
    group: {
      marginBottom: "18px",
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "600",
      color: "#334155",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      fontSize: "15px",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "13px",
      border: "none",
      borderRadius: "8px",
      background: "#2563eb",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "10px",
    },
    footer: {
      textAlign: "center",
      marginTop: "20px",
      color: "#64748b",
    },
    link: {
      color: "#2563eb",
      textDecoration: "none",
      fontWeight: "600",
    },
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://print-ecom-server.onrender.com/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // alert("Login Successful");

      // navigate("/profile");
      window.location.href = "/profile";
      
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Invalid email or password"
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>
          Login to your Print Shop account
        </p>

        <form onSubmit={handleSubmit}>
          <div style={styles.group}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              style={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              style={styles.input}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <a href="/register" style={styles.link}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;