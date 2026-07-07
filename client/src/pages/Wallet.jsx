import React from "react";

const Wallet = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Wallet</h2>

      <div className="card p-4 mb-4">
        <h5>Account Balance</h5>
        <p className="fs-2">₹{user?.walletBalance || 0}</p>
        <p>Wallet top-up is not available yet.</p>
      </div>

      <div className="card p-4">
        <h5>Transaction History</h5>
        <p>No transactions available yet.</p>
      </div>
    </div>
  );
};

export default Wallet;
