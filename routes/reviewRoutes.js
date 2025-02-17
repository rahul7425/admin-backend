const express = require("express");
const router = express.Router();
const { createReview, getReviewsByBlog, replyToReview, deleteReview } = require("../controllers/reviewController");

// Create a review
router.post("/reviews", createReview);

// Get all reviews for a specific blog
router.get("/reviews/:blogId", getReviewsByBlog);

// Admin replies to a review
router.put("/reviews/reply/:id", replyToReview);

// Delete a review
router.delete("/reviews/:id", deleteReview);

module.exports = router;
