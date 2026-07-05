const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getUserOrders,
  getMyOrders,
} = require("../controllers/orderController");

router.post("/", createOrder);

router.get("/", getOrders);

router.get("/my-orders", protect, getMyOrders);

router.get("/user/:userId", getUserOrders);

router.put(
  "/admin/:id",
  protect,
  adminMiddleware,
  updateOrderStatus
);

router.get("/:id", getOrderById);

module.exports = router;