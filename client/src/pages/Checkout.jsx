import { useCart } from "../context/CartContext";
import { useState } from "react";
import axios from "axios";

function Checkout() {
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const orderData = {
        user: user.id,

        products: cartItems.map((item) => ({
          product: item._id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),

        shippingAddress: formData,

        totalAmount: total,
      };

      const res = await axios.post(
        "https://print-ecom-server.onrender.com/api/orders",
        orderData,
      );

      console.log(res.data);

      alert("Order placed successfully!");

      clearCart();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to place order");
    }
  };

  const handlePayment = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const { data } = await axios.post(
        "https://print-ecom-server.onrender.com/api/payment/create-order",
        {
          amount: total,
        },
      );

      const options = {
        key: "rzp_test_T3qk7ShbZsNeR0",

        amount: data.amount,
        currency: data.currency,
        order_id: data.id,

        name: "Print Shop",
        description: "Order Payment",

        handler: async function (response) {
          const verify = await axios.post(
            "https://print-ecom-server.onrender.com/api/payment/verify-payment",
            response,
          );

          if (verify.data.success) {
            const orderData = {
              user: user.id,

              products: cartItems.map((item) => ({
                product: item._id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
              })),

              shippingAddress: formData,

              totalAmount: total,

              paymentStatus: "Paid",
            };

            await axios.post("https://print-ecom-server.onrender.com/api/orders", orderData);

            alert("Payment Successful & Order Placed!");

            clearCart();
          }
        },

        prefill: {
          name: formData.fullName,
          contact: formData.phone,
        },

        theme: {
          color: "#3399cc",
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load");
        return;
      }
      
      const razor = new window.Razorpay(options);
      razor.on("payment.failed", function (response) {
        console.log("Payment Failed:", response.error);
      });

      razor.open();
    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Checkout</h2>

      <div className="row">
        <div className="col-md-7">
          <form>
            <input
              className="form-control mb-3"
              placeholder="Full Name"
              name="fullName"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              placeholder="Phone Number"
              name="phone"
              onChange={handleChange}
              required
            />

            <textarea
              className="form-control mb-3"
              placeholder="Address"
              name="address"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              placeholder="City"
              name="city"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              placeholder="State"
              name="state"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              placeholder="Pincode"
              name="pincode"
              onChange={handleChange}
              required
            />

            {/* <button type="submit" className="btn btn-success">
              Place Order
            </button> */}
          </form>

          <button className="btn btn-success" onClick={handlePayment}>
            Pay Now
          </button>
        </div>

        <div className="col-md-5">
          <div className="card p-3">
            <h4>Order Summary</h4>

            {cartItems.map((item) => (
              <div key={item._id} className="d-flex justify-content-between">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <hr />

            <h5>Total: ₹{total}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
