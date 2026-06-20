// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");

// // Get all products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();

//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// // Get single product
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;