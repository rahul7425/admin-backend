const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true }, // Example: "home"
  titles: [
    {
      key: { type: String, required: true }, // Example: "hero_section"
      title: { type: String, required: true },
      description: { type: String, required: true }
    }
  ]
});

const Seo = mongoose.model("Seo", seoSchema);
module.exports = Seo;
