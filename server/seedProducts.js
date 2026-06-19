const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    title: "Custom Oversized T-Shirt",
    description: "Premium cotton oversized t-shirt with custom print.",
    category: "Clothing",
    price: 799,
    discountPrice: 699,
    stock: 50,
    images: ["https://picsum.photos/400?random=1"],
    featured: true,
  },
  {
    title: "Photo Printed Mug",
    description: "Personalized ceramic mug with photo printing.",
    category: "Mug",
    price: 299,
    discountPrice: 249,
    stock: 100,
    images: ["https://picsum.photos/400?random=2"],
    featured: true,
  },
  {
    title: "Custom Steel Bottle",
    description: "750ml stainless steel bottle with custom design.",
    category: "Bottle",
    price: 499,
    discountPrice: 449,
    stock: 75,
    images: ["https://picsum.photos/400?random=3"],
    featured: false,
  },
  {
    title: "Personalized Diary",
    description: "A5 hardbound diary with custom name printing.",
    category: "Diary",
    price: 399,
    discountPrice: 349,
    stock: 40,
    images: ["https://picsum.photos/400?random=4"],
    featured: false,
  },
  {
    title: "Custom Phone Cover",
    description: "Shockproof mobile cover with custom photo print.",
    category: "Phone Cover",
    price: 349,
    discountPrice: 299,
    stock: 120,
    images: ["https://picsum.photos/400?random=5"],
    featured: true,
  },
  {
    title: "Printed Hoodie",
    description: "Warm fleece hoodie with custom logo printing.",
    category: "Clothing",
    price: 1299,
    discountPrice: 1099,
    stock: 30,
    images: ["https://picsum.photos/400?random=6"],
  },
  {
    title: "Corporate Gift Set",
    description: "Bottle, diary and pen combo gift set.",
    category: "Accessory",
    price: 999,
    discountPrice: 899,
    stock: 25,
    images: ["https://picsum.photos/400?random=7"],
  },
  {
    title: "Printed Tote Bag",
    description: "Eco-friendly tote bag with custom artwork.",
    category: "Accessory",
    price: 249,
    discountPrice: 199,
    stock: 80,
    images: ["https://picsum.photos/400?random=8"],
  },
  {
    title: "Custom Keychain",
    description: "Acrylic keychain with photo printing.",
    category: "Accessory",
    price: 149,
    discountPrice: 99,
    stock: 200,
    images: ["https://picsum.photos/400?random=9"],
  },
  {
    title: "Sports Water Bottle",
    description: "Lightweight printed sports bottle.",
    category: "Bottle",
    price: 599,
    discountPrice: 499,
    stock: 60,
    images: ["https://picsum.photos/400?random=10"],
  }
];

async function seedData() {
  try {
     await Product.collection.dropIndexes().catch(() => {});
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("✅ Products Seeded Successfully");

    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
}

seedData();