const express = require("express");
const router = express.Router();

const Review = require("../models/Review");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/:productId", authMiddleware, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const alreadyReviewed = await Review.findOne({
      product: req.params.productId,
      user: req.user.id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You already reviewed this product",
      });
    }

    await Review.create({
      product: req.params.productId,
      user: req.user.id,
      rating,
      comment,
    });

    const reviews = await Review.find({
      product: req.params.productId,
    });

    product.numReviews = reviews.length;

    product.rating =
      reviews.reduce((acc, item) => acc + item.rating, 0) /
      reviews.length;

    await product.save();

    res.json({
      message: "Review added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/protected-test", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});
module.exports = router;