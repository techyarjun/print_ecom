import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await axios.post(
      "https://print-ecom-server.onrender.com/api/auth/register",
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }
    );

    alert(res.data.message);

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }
};

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
      maxWidth: "450px",
      background: "#fff",
      padding: "35px",
      borderRadius: "18px",
      boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
    },
    heading: {
      textAlign: "center",
      color: "#1e293b",
      marginBottom: "8px",
      fontSize: "30px",
      fontWeight: "700",
    },
    subHeading: {
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

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Account</h2>
        <p style={styles.subHeading}>
          Register to start ordering custom prints
        </p>

        <form onSubmit={handleSubmit}>
          <div style={styles.group}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              style={styles.input}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              style={styles.input}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              style={styles.input}
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
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              style={styles.input}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <a href="/login" style={styles.link}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;