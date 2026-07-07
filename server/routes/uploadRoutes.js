const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post(
  "/product",
  upload.array("images", 10),
  (req, res) => {
    res.json({
      imageUrls: req.files.map((file) => `https://print-ecom-server.onrender.com/uploads/products/${file.filename}`),
    });
  }
);

router.post(
  "/custom-design",
  upload.single("image"),
  (req, res) => {
    res.json({
      imageUrl: `https://print-ecom-server.onrender.com/uploads/products/${req.file.filename}`,
    });
  }
);

router.post(
  "/products-multiple",
  upload.array("images", 10),
  (req, res) => {
    const imageUrls = req.files.map(
      (file) =>
        `https://print-ecom-server.onrender.com/uploads/products/${file.filename}`
    );

    res.json({
      images: imageUrls,
    });
  }
);
module.exports = router;