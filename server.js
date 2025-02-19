const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes");
const blogRoutes = require("./routes/blogRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const seoRoutes = require("./routes/seoRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Added the admin routes
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
app.use("/api",finleads);
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
