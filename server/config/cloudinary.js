const { v2: cloudinary } = require("cloudinary");

// Render already provides CLOUDINARY_URL
// Cloudinary SDK automatically reads it from process.env

console.log("Cloudinary URL presence:", {
  cloudinaryUrl: !!process.env.CLOUDINARY_URL,
});

if (!process.env.CLOUDINARY_URL) {
  console.error(
    "Cloudinary config missing. Set CLOUDINARY_URL in environment variables."
  );
}

module.exports = cloudinary;