const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Admin Login (First-time login: save email, password, and token)
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the admin exists in the database
    let admin = await Admin.findOne({ email });

    if (!admin) {
      // If no admin found, create a new entry for the admin
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      admin = new Admin({
        email,
        password: hashedPassword,
        token: jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" }), // First-time login, generate a token
      });

      await admin.save();
      return res.status(200).json({
        success: true,
        message: "Admin created and logged in successfully",
        token: admin.token, // Send the JWT token
      });
    }

    // For existing admin, compare the provided password with the stored password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate a new token for the admin
    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Save the token back to the database
    admin.token = token;
    await admin.save();

    // Return the new token
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
