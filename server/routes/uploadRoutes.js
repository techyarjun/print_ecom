// const express = require("express");
// const multer = require("multer");
// const path = require("path");

// const router = express.Router();

// // Storage Config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/products");
//   },

//   filename: function (req, file, cb) {
//     cb(
//       null,
//       Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage });

// router.post(
//   "/product",
//   upload.array("images", 10),
//   (req, res) => {
//     res.json({
//       imageUrls: req.files.map((file) => `https://print-ecom-server.onrender.com/uploads/products/${file.filename}`),
//     });
//   }
// );

// router.post(
//   "/custom-design",
//   upload.single("image"),
//   (req, res) => {
//     res.json({
//       imageUrl: `https://print-ecom-server.onrender.com/uploads/products/${req.file.filename}`,
//     });
//   }
// );

// router.post(
//   "/products-multiple",
//   upload.array("images", 10),
//   (req, res) => {
//     const imageUrls = req.files.map(
//       (file) =>
//         `https://print-ecom-server.onrender.com/uploads/products/${file.filename}`
//     );

//     res.json({
//       images: imageUrls,
//     });
//   }
// );
// module.exports = router;


//above code is commited and replaced for cloudinary images

const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(fileBuffer);
  });
};


// ===============================
// UPLOAD PRODUCT IMAGES
// ===============================

router.post(
  "/product",
  upload.array("images", 10),
  async (req, res) => {
    try {
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(
          file.buffer,
          "printshop/products"
        )
      );

      const results = await Promise.all(uploadPromises);

      const imageUrls = results.map(
        (result) => result.secure_url
      );

      res.json({
        imageUrls,
      });

    } catch (error) {
      console.error("Product upload error:", error);

      res.status(500).json({
        message: "Image upload failed",
        error: error.message,
      });
    }
  }
);


// ===============================
// CUSTOM DESIGN UPLOAD
// ===============================

router.post(
  "/custom-design",
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No image provided",
        });
      }

      const result = await uploadToCloudinary(
        req.file.buffer,
        "printshop/custom-designs"
      );

      res.json({
        imageUrl: result.secure_url,
      });

    } catch (error) {
      console.error("Custom design upload error:", error);

      res.status(500).json({
        message: "Image upload failed",
        error: error.message,
      });
    }
  }
);


// ===============================
// MULTIPLE PRODUCT IMAGES
// ===============================

router.post(
  "/products-multiple",
  upload.array("images", 10),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          message: "No images uploaded",
        });
      }

      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(
          file.buffer,
          "printshop/products"
        )
      );

      const results = await Promise.all(uploadPromises);

      const images = results.map(
        (result) => result.secure_url
      );

      res.json({
        images,
      });

    } catch (error) {
      console.error("Multiple upload error:", error);

      res.status(500).json({
        message: "Images upload failed",
        error: error.message,
      });
    }
  }
);


module.exports = router;