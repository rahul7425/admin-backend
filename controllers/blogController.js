const Blog = require("../models/Blog");  // Correct path to Blog model

// Create a new blog (supports image upload)
const createBlog = async (req, res) => {
  try {
    const { title, description, content, categories, status } = req.body;

    if (!title || !description || !content || !categories || categories.length === 0 || !status) {
      return res.status(400).json({ error: "All fields are required" });
    } 

    // Handle image upload (image URL or file path)
    let imageUrl = req.file ? req.file.path : "";  // Store the uploaded image path (or keep it empty if no image uploaded)

    const newBlog = new Blog({
      title,
      description,
      content,
      author: 'Admin', // Author is always admin
      categories,
      status,
      image: imageUrl,  // Store the image URL (path)
    });

    await newBlog.save();

    res.status(201).json({ success: true, message: "Blog created successfully", data: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all blogs (supports pagination, filtering, and status filtering)
const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", status, category } = req.query;

    const query = {};

    if (status) query.status = status;
    if (category) query.categories = category;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } }
      ];
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalBlogs = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      data: blogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: parseInt(page),
      totalBlogs
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update an existing blog (supports image update)
const updateBlog = async (req, res) => {
  try {
    const { title, description, content, categories, status } = req.body;

    // Handle image update (if new image uploaded)
    let imageUrl = req.file ? req.file.path : undefined;  // Use the new uploaded image

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,  // Blog ID from URL
      { title, description, content, categories, status, image: imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ success: true, message: "Blog updated successfully", data: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
