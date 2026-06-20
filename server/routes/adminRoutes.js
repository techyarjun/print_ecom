const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const { getAdminStats } = require("../controllers/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");

// router.get("/stats", adminMiddleware, async (req, res) => {
//   try {
//     const products = await Product.countDocuments();
//     const orders = await Order.countDocuments();
//     const users = await User.countDocuments();

//     res.status(200).json({
//       products,
//       orders,
//       users,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });



router.get("/stats", adminMiddleware, async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();
    const users = await User.countDocuments();

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const revenue =
      revenueData.length > 0
        ? revenueData[0].totalRevenue
        : 0;

    res.json({
      products,
      orders,
      users,
      revenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;