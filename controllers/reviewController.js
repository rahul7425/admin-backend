const Review = require("../models/Review");
const Blog = require("../models/Blog");

// Create a review
const createReview = async (req, res) => {
  try {
    const { blogId, userName, rating, comment } = req.body;

    if (!blogId || !userName || !rating || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const newReview = new Review({ blogId, userName, rating, comment });
    await newReview.save();

    res.status(201).json({ success: true, message: "Review added successfully", data: newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get reviews for a specific blog
const getReviewsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const reviews = await Review.find({ blogId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createReview, getReviewsByBlog, deleteReview };