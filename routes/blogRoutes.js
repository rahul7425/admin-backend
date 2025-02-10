const express = require("express");
const router = express.Router();
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require("../controllers/blogController");

router.post("/blogs", createBlog);       // Create a blog
router.get("/blogs", getAllBlogs);       // Get all blogs
router.get("/blogs/:id", getBlogById);   // Get a blog by ID
router.put("/blogs/:id", updateBlog);    // Update a blog
router.delete("/blogs/:id", deleteBlog); // Delete a blog

module.exports = router;