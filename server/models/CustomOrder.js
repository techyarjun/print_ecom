const mongoose = require("mongoose");

const customOrderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

    customerName: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    color: {
      type: String,
      default: "",
    },

    size: {
      type: String,
      default: "",
    },

    customText: {
      type: String,
      default: "",
    },

    designImage: {
      type: String,
      default: "",
    },

    // Front Design
    logoPosition: {
      x: {
        type: Number,
        default: 120,
      },
      y: {
        type: Number,
        default: 100,
      },
    },

    // Back Design
    backNamePosition: {
      x: Number,
      y: Number,
    },

    sloganPosition: {
      x: Number,
      y: Number,
    },

    textColor: {
      type: String,
      default: "#000000",
    },

    fontSize: {
      type: Number,
      default: 24,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Printing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    frontPreviewImage: {
      type: String,
      default: "",
    },

    backPreviewImage: {
      type: String,
      default: "",
    },

    backName: {
  type: String,
  default: "",
},

slogan: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("CustomOrder", customOrderSchema);
