const express = require("express");
const cors = require("cors");
const path    = require('path');
require("dotenv").config();

const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");
const serviceRoutes = require("./routes/services");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");

const app = express();
app.use(cors());
app.use(express.json());

// ***** serve uploaded files publicly *****
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test base route
app.get("/", (req, res) => {
  res.send("The Oga Importer API is running...");
});

// Use your actual routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
