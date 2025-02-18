const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const blogController = require('../controllers/blogController');


// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set your directory for storing images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename using timestamp
  }
});

// Multer file filter (optional, if you want to allow only image files)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true); // Accept the file if it is an image
  } else {
    cb("Error: Only image files are allowed!", false); // Reject file if it is not an image
  }
};

// Set up Multer middleware for single file upload
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Import your controllers
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require("../controllers/blogController");

// Set up routes
router.post("/blogs", upload.single("image"), createBlog); // Use the image upload middleware
router.get("/blogs", getAllBlogs); // Get all blogs
router.get("/blogs/:id", getBlogById); // Get a blog by ID
router.put("/blogs/:id", upload.single("image"), updateBlog); // Update a blog
router.delete("/blogs/:id", deleteBlog); // Delete a blog

module.exports = router;
