const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/ProductRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribedRoutes = require("./routes/subscriberRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoute = require("./routes/ProductRoutes");
const adminorderRoute = require("./routes/adminorderRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect Database BEFORE routes
connectDB();

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to NextMart API");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe", subscribedRoutes);
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoute);
app.use("/api/admin/orders", adminorderRoute);

// IMPORTANT: Railway provides PORT automatically
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});