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

const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error("Missing Cloudinary environment variables");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const config = cloudinary.config();

console.log("Cloudinary config check:", {
  cloud_name: config.cloud_name,
  api_key_length: String(config.api_key || "").length,
  api_secret_length: String(config.api_secret || "").length,
});

module.exports = cloudinary;