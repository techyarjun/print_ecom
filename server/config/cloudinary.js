const { v2: cloudinary } = require("cloudinary");

const cloudinaryUrl = process.env.CLOUDINARY_URL;

if (!cloudinaryUrl) {
  throw new Error("CLOUDINARY_URL is missing");
}

const url = new URL(cloudinaryUrl);

const apiKey = decodeURIComponent(url.username);
const apiSecret = decodeURIComponent(url.password);
const cloudName = url.hostname;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const config = cloudinary.config();

console.log("Cloudinary SDK config:", {
  cloud_name: !!config.cloud_name,
  api_key: !!config.api_key,
  api_secret: !!config.api_secret,
});

module.exports = cloudinary;