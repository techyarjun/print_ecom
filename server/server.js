// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const path = require("path");


// const connectDB = require("./config/db");

// const authRoutes = require("./routes/authRoutes");
// const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const customOrderRoutes = require("./routes/customOrderRoutes");
// const uploadRoutes = require("./routes/uploadRoutes");
// const reviewRoutes = require("./routes/reviewRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const aiRoutes = require("./routes/aiRoutes");


// const app = express();

// connectDB();

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/custom-orders", customOrderRoutes);
// app.use("/api/upload", uploadRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/contacts", contactRoutes);
// app.use("/api/ai", aiRoutes);


// app.get("/", (req, res) => {
//   res.send("API Running");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


//cloudinary code added for image upload

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, ".env");
const rootEnvPath = path.resolve(__dirname, "../.env");
const configPath = fs.existsSync(envPath) ? envPath : rootEnvPath;

dotenv.config({ path: configPath });

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const customOrderRoutes = require("./routes/customOrderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const contactRoutes = require("./routes/contactRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/custom-orders", customOrderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});