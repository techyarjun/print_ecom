import { useEffect, useState } from "react";
import axios from "axios";

function CustomOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/custom-orders"
    );

    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/custom-orders/${id}/status`,
      { status }
    );

    fetchOrders();
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete order?")) return;

    await axios.delete(
      `http://localhost:5000/api/custom-orders/${id}`
    );

    fetchOrders();
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(
      (o) => o.status === "Pending"
    ).length,
    processing: orders.filter(
      (o) => o.status === "Processing"
    ).length,
    printing: orders.filter(
      (o) => o.status === "Printing"
    ).length,
    shipped: orders.filter(
      (o) => o.status === "Shipped"
    ).length,
    delivered: orders.filter(
      (o) => o.status === "Delivered"
    ).length,
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        Custom Orders Dashboard
      </h2>

      {/* Stats */}

      <div className="row g-3 mb-4">
        <div className="col-md-2">
          <div className="card text-center">
            <div className="card-body">
              <h5>{stats.total}</h5>
              <p>Total</p>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-center">
            <div className="card-body">
              <h5>{stats.pending}</h5>
              <p>Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-center">
            <div className="card-body">
              <h5>{stats.processing}</h5>
              <p>Processing</p>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-center">
            <div className="card-body">
              <h5>{stats.printing}</h5>
              <p>Printing</p>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-center">
            <div className="card-body">
              <h5>{stats.shipped}</h5>
              <p>Shipped</p>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-center">
            <div className="card-body">
              <h5>{stats.delivered}</h5>
              <p>Delivered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Phone</th>
              <th>Qty</th>
              <th>Design</th>
              <th>Status</th>
              <th>Date</th>
              <th width="120">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <strong>
                    {order.customerName}
                  </strong>
                  <br />
                  {order.email}
                </td>

                <td>
                  {order.product?.title}
                </td>

                <td>{order.phone}</td>

                <td>{order.quantity}</td>

                <td>
                  {order.designImage && (
                    <img
                      src={`http://localhost:5000${order.designImage}`}
                      alt=""
                      width="60"
                    />
                  )}
                </td>

                <td>
                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Printing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                <td>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteOrder(order._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomOrders;