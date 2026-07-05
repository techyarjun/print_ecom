export const getImageUrl = (image) => {
  if (!image) {
    return "https://via.placeholder.com/300";
  }

  if (image.startsWith("http")) {
    return image;
  }

  return `http://localhost:5000${image}`;
};