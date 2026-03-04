const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db.js");

const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/ProductRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const checkoutRoutes = require("./routes/checkoutRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const subscribedRoutes = require("./routes/subscriberRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const productAdminRoute = require("./routes/ProductRoutes.js");
const adminorderRoute = require("./routes/adminorderRoutes.js");

const app = express();

app.use(express.json());
app.use(cors());

// Connect DB BEFORE routes
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to NextMart API");
});

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

module.exports = app;