const express = require("express");
const mongoose = require("./config/db");
const Account = require("./models/account.model");
const categoryRoutes = require("./routes/category.route");
const productRoutes = require("./routes/product.route");
const authRoutes = require("./routes/auth.route");
const adminRoutes = require("./routes/admin.route");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.use("/dashboard", adminRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
