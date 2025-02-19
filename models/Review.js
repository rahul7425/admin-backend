const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  name: { type: String, required: true },       // Name of the person submitting the review
  email: { type: String, required: true },      // Email of the person
  phone: { type: String, required: true },      // Phone number of the person
  msg: { type: String, required: true },        // The message or comment from the user
  adminReply: { type: String, default: "" },    // Admin's reply to the review
  createdAt: { type: Date, default: Date.now }  // Automatically set to the current date
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
