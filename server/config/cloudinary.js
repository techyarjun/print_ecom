const { v2: cloudinary } = require("cloudinary");

const cloudinaryUrl = process.env.CLOUDINARY_URL;

if (!cloudinaryUrl) {
  throw new Error("CLOUDINARY_URL is missing");
}

try {
  const url = new URL(cloudinaryUrl);

  const apiKey = url.username;
  const apiSecret = url.password;
  const cloudName = url.hostname;

  console.log("Cloudinary config presence:", {
    cloudName: !!cloudName,
    apiKey: !!apiKey,
    apiSecret: !!apiSecret,
  });

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

} catch (error) {
  console.error("Invalid CLOUDINARY_URL format:", error.message);
  throw error;
}

module.exports = cloudinary;