const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

// Create Order
const createOrder = async (req, res) => {
  try {
    const {
      user,
      products,
      shippingAddress,
      totalAmount,
    } = req.body;

    const order = await Order.create({
      user,
      products,
      shippingAddress,
      totalAmount,
    });

    const userData = await User.findById(user);

    await sendEmail(
      process.env.EMAIL_USER,
      "New Order Received",
      `
      <h2>New Order Received</h2>

      <p><strong>Customer:</strong> ${
        userData?.name || "Unknown"
      }</p>

      <p><strong>Email:</strong> ${
        userData?.email || "N/A"
      }</p>

      <p><strong>Total Amount:</strong> ₹${totalAmount}</p>

      <h3>Shipping Address</h3>

      <p>
        ${shippingAddress?.address || ""}
        <br/>
        ${shippingAddress?.city || ""}
        <br/>
        ${shippingAddress?.state || ""}
      </p>
      `
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to place order",
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product");

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

// Get Single Order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    )
      .populate("user", "name email")
      .populate("products.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = req.body.orderStatus;

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getMyOrders,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};