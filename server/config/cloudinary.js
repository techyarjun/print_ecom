// const { v2: cloudinary } = require("cloudinary");

// const cloudinaryUrl = process.env.CLOUDINARY_URL;

// if (!cloudinaryUrl) {
//   throw new Error("CLOUDINARY_URL is missing");
// }

// const url = new URL(cloudinaryUrl);

// const apiKey = decodeURIComponent(url.username);
// const apiSecret = decodeURIComponent(url.password);
// const cloudName = url.hostname;

// cloudinary.config({
//   cloud_name: cloudName,
//   api_key: apiKey,
//   api_secret: apiSecret,
//   secure: true,
// });

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// //   secure: true,
// // });

// const config = cloudinary.config();

// console.log("Cloudinary SDK config:", {
//   cloud_name: !!config.cloud_name,
//   api_key: !!config.api_key,
//   api_secret: !!config.api_secret,
// });

// // console.log("Cloudinary SDK config:", {
// //   cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: !!process.env.CLOUDINARY_API_KEY,
// //   api_secret: !!process.env.CLOUDINARY_API_SECRET,
// // });

// module.exports = cloudinary;

const { v2: cloudinary } = require("cloudinary");

if (!process.env.CLOUDINARY_URL) {
  throw new Error("CLOUDINARY_URL is missing");
}

// Cloudinary SDK reads CLOUDINARY_URL automatically
cloudinary.config({
  secure: true,
});

const config = cloudinary.config();

console.log("Cloudinary SDK config:", {
  cloud_name: !!config.cloud_name,
  api_key: !!config.api_key,
  api_secret: !!config.api_secret,
});

module.exports = cloudinary;