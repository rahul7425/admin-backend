const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
require("dotenv").config();  // Load environment variables from .env file

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
      // If admin does not exist, create a new admin
      admin = new Admin({ email, password });
      await admin.save(); // Save admin with hashed password
      return res.status(201).json({ success: true, message: "Admin created and logged in", token: generateToken(admin) });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate the JWT with the admin's ID and the secret from the environment variable
    const token = generateToken(admin);

    // Send the token in response
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

// Helper function to generate JWT token
const generateToken = (admin) => {
  return jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Set expiration time for the token
  });
};

module.exports = { loginAdmin };
