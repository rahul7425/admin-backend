const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  categories: [{ type: String, required: true }], // New category field
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
