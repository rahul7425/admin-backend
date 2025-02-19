const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true }, // Example: "home"
  title: { type: String, required: true },              // Title for the page (used in SERP)
  description: { type: String, required: true }          // Description for the page (used in SERP)
});

const Seo = mongoose.model("Seo", seoSchema);
module.exports = Seo;
