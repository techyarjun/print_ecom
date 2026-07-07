export const API_URL = import.meta.env.VITE_API_URL || "https://print-ecom-server.onrender.com";

export const getImageUrl = (image) => {
  if (!image) {
    return "https://via.placeholder.com/300";
  }

  if (image.startsWith("http")) {
    return image;
  }

  return `${API_URL}${image}`;
};