const Product = require("../models/Product");

// Get All Products
const getProducts = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            {
              title: {
                $regex: req.query.search,
                $options: "i",
              },
            },
            {
              description: {
                $regex: req.query.search,
                $options: "i",
              },
            },
            {
              category: {
                $regex: req.query.search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const categoryFilter = req.query.category
      ? {
          category: req.query.category,
        }
      : {};

    let sortOption = {};

    if (req.query.sort === "low") {
      sortOption = { price: 1 };
    }

    if (req.query.sort === "high") {
      sortOption = { price: -1 };
    }

    if (req.query.sort === "newest") {
      sortOption = { createdAt: -1 };
    }

    let priceFilter = {};

    if (req.query.price === "under500") {
      priceFilter = {
        price: { $lt: 500 },
      };
    }

    if (req.query.price === "500to1000") {
      priceFilter = {
        price: {
          $gte: 500,
          $lte: 1000,
        },
      };
    }

    if (req.query.price === "above1000") {
      priceFilter = {
        price: { $gt: 1000 },
      };
    }

    const products = await Product.find({
      ...keyword,
      ...categoryFilter,
      ...priceFilter,
    }).sort(sortOption);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
