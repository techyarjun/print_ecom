import React from "react";
import { Link } from "react-router-dom";

const Addresses = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Saved Addresses</h2>

      <div className="card p-4 mb-4">
        <h5>No saved addresses found</h5>
        <p>
          Add an address to speed up checkout and make delivery easier.
        </p>
        <Link to="/checkout" className="btn btn-primary">
          Add Address
        </Link>
      </div>

      <div className="card p-4">
        <h5>Your account</h5>
        <p>Name: {user?.name || "Guest"}</p>
        <p>Email: {user?.email || "Not signed in"}</p>
      </div>
    </div>
  );
};

export default Addresses;
