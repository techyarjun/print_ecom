const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");


const getAdminStats = async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();
    const users = await User.countDocuments();

    res.json({
      products,
      orders,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getAdminStats };