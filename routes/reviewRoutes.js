const express = require("express");
const router = express.Router();
const { createReview, getReviewsByBlog, deleteReview } = require("../controllers/reviewController");

router.post("/reviews", createReview);        // Create a review
router.get("/reviews/:blogId", getReviewsByBlog); // Get all reviews for a blog
router.delete("/reviews/:id", deleteReview);  // Delete a review

module.exports = router;