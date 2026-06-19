const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Clothing",
        "Bottle",
        "Diary",
        "Accessory",
        "Mug",
        "Phone Cover",
        "Other",
      ],
    },

    brand: {
      type: String,
      default: "PrintShop",
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    images: [String],

    colors: [String],

    sizes: [String],

    material: String,

    printType: {
      type: String,
      enum: [
        "Screen Print",
        "DTF",
        "Sublimation",
        "Embroidery",
        "Vinyl",
        "Other",
      ],
    },

    customizable: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    totalSales: {
      type: Number,
      default: 0,
    },

    tags: [String],

    featured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);