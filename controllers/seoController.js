const Seo = require("../models/SEO");

// Add new SEO Data for a specific page
const addSeoData = async (req, res) => {
  try {
    const { page, title, description } = req.body;

    // Check if all fields are provided
    if (!page || !title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if SEO data for this page already exists
    const existingSeo = await Seo.findOne({ page });

    if (existingSeo) {
      return res.status(400).json({ error: "SEO data already exists for this page" });
    }

    // Create new SEO entry
    const seoData = new Seo({ page, title, description });

    // Save to database
    await seoData.save();

    res.status(201).json({ success: true, message: "SEO data added successfully", data: seoData });
  } catch (error) {
    console.error("Error adding SEO data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update SEO Data (Title & Description)
const updateSeoData = async (req, res) => {
  try {
    const { page } = req.params;
    const { title, description } = req.body;

    // Find the SEO data for the specific page
    let seoData = await Seo.findOne({ page });

    if (!seoData) {
      return res.status(404).json({ error: "SEO data not found for this page" });
    }

    // Update the existing SEO data for the page
    if (title) seoData.title = title;
    if (description) seoData.description = description;

    // Save the updated SEO data to the database
    await seoData.save();
    res.status(200).json({ success: true, message: "SEO data updated successfully" });
  } catch (error) {
    console.error("Error updating SEO data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get SEO Data for a specific page
const getSeoData = async (req, res) => {
  try {
    const { page } = req.params;

    // Find the SEO data for the specific page
    const seoData = await Seo.findOne({ page });

    if (!seoData) {
      return res.status(404).json({ error: "SEO data not found for this page" });
    }

    // Return the SEO data
    res.status(200).json(seoData);
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addSeoData, updateSeoData, getSeoData };
