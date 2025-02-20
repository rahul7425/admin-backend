require("dotenv").config(); // Load environment variables at the top
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes");
const blogRoutes = require("./routes/blogRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const seoRoutes = require("./routes/seoRoutes");
const adminRoutes = require("./routes/adminRoutes");
const finleads = require("./routes/finunique/finleadsRouter");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Use Routes
app.use("/api", formRoutes);
app.use("/api", blogRoutes);
app.use("/api", reviewRoutes);
app.use("/api/seo", seoRoutes);
app.use("/api", adminRoutes);
app.use("/api", finleads);

// Check if JWT_SECRET exists before starting the server
if (!process.env.JWT_SECRET) {
  console.error(" JWT_SECRET is missing in environment variables!");
  process.exit(1); // Stop the server
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
