import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, clearCart } =
    useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <h4>Your Cart is Empty</h4>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="img-fluid rounded"
                    />
                  </div>

                  <div className="col-md-4">
                    <h5>{item.title}</h5>
                    <p className="text-muted">₹{item.price}</p>
                  </div>

                  <div className="col-md-3">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => decreaseQty(item._id)}
                      >
                        -
                      </button>

                      <span className="fw-bold">{item.quantity}</span>

                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => increaseQty(item._id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <strong>₹{item.price * item.quantity}</strong>
                  </div>

                  <div className="col-md-1">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item._id)}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="card p-4 shadow">
            <h4>Total Amount: ₹{total}</h4>

            <div className="mt-3 d-flex gap-3">
              <button className="btn btn-outline-danger" onClick={clearCart}>
                Clear Cart
              </button>

              <Link to="/checkout" className="btn btn-success">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
