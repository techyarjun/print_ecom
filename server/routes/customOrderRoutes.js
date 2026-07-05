const express = require("express");

const router = express.Router();

const {
  createCustomOrder,
  getCustomOrders,
  updateCustomOrderStatus,
  deleteCustomOrder,
} = require("../controllers/customOrderController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createCustomOrder);

router.get("/", getCustomOrders);

router.put("/:id/status", updateCustomOrderStatus);

router.delete("/:id", deleteCustomOrder);

module.exports = router;