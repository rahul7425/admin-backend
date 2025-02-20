const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
require("dotenv").config(); // Load environment variables

// Admin login API
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if the admin exists in the database
    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Directly compare passwords (plain text)
    if (admin.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if JWT_SECRET is available
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing!");
      return res.status(500).json({ error: "Server error: JWT secret missing" });
    }

    // Generate JWT token
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { loginAdmin };
