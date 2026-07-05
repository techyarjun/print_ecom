const CustomOrder = require("../models/CustomOrder");

// const createCustomOrder = async (req, res) => {
//   try {
//     const {
//       product,
//       customerName,
//       email,
//       phone,
//       quantity,
//       color,
//       size,
//       customText,
//       designImage,

//       logoPosition,
//       backName,
//       slogan,
//       textColor,
//       fontSize,

//       backNamePosition,
//       sloganPosition,

//       frontPreviewImage,
//       backPreviewImage,
//     } = req.body;

//     const order = await CustomOrder.create({
//       product,
//       customerName,
//       email,
//       phone,
//       quantity,
//       color,
//       size,
//       customText,
//       designImage,

//       logoPosition,
//       backName,
//       slogan,
//       textColor,
//       fontSize,

//       backNamePosition,
//       sloganPosition,

//       frontPreviewImage,
//       backPreviewImage,
//     });

//     res.status(201).json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const createCustomOrder = async (req, res) => {
  try {
    console.log("REQ BODY =", req.body);

    const {
      product,
      customerName,
      email,
      phone,
      quantity,
      color,
      size,
      customText,
      designImage,

      logoPosition,
      backName,
      slogan,
      textColor,
      fontSize,

      backNamePosition,
      sloganPosition,

      frontPreviewImage,
      backPreviewImage,
    } = req.body;

    console.log("BACK NAME =", backName);
    console.log("SLOGAN =", slogan);

    console.log("REQ USER =", req.user);

    const order = await CustomOrder.create({
      user: req.user.id,

      product,
      customerName,
      email,
      phone,
      quantity,
      color,
      size,
      customText,
      designImage,

      logoPosition,
      backName,
      slogan,
      textColor,
      fontSize,

      backNamePosition,
      sloganPosition,

      frontPreviewImage,
      backPreviewImage,
    });

    console.log("SAVED ORDER =", order);

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCustomOrders = async (req, res) => {
  try {
    const orders = await CustomOrder.find()
      .populate("product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCustomOrderStatus = async (req, res) => {
  try {
    const order = await CustomOrder.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCustomOrder = async (req, res) => {
  try {
    const order = await CustomOrder.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCustomOrder,
  getCustomOrders,
  updateCustomOrderStatus,
  deleteCustomOrder,
};
