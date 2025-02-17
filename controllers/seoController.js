const Seo = require("../models/SEO");

// Get SEO Data for a Page  
const getSeoData = async (req, res) => {
  try {  
    const { page } = req.params;
    const seoData = await Seo.findOne({ page });

    if (!seoData) {
      return res.status(404).json({ error: "SEO data not found for this page" });
    }

    res.status(200).json({ success: true, data: seoData.titles });
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a Specific Title & Description
const updateSeoData = async (req, res) => {
  try {
    const { page, key } = req.params;
    const { title, description } = req.body;

    const seoData = await Seo.findOne({ page });

    if (!seoData) {
      return res.status(404).json({ error: "SEO data not found" });
    }

    // Find the specific section by key
    const entry = seoData.titles.find(entry => entry.key === key);
    
    if (!entry) {
      return res.status(404).json({ error: "Title key not found" });
    }

    // Update title & description
    if (title) entry.title = title;
    if (description) entry.description = description;

    await seoData.save();
    res.status(200).json({ success: true, message: "SEO data updated successfully" });
  } catch (error) {
    console.error("Error updating SEO data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a New Title & Description for a Page
const addSeoData = async (req, res) => {
  try {
    const { page } = req.params;
    const { key, title, description } = req.body;

    let seoData = await Seo.findOne({ page });

    if (!seoData) {
      seoData = new Seo({ page, titles: [{ key, title, description }] });
    } else {
      // Prevent duplicate keys
      if (seoData.titles.some(entry => entry.key === key)) {
        return res.status(400).json({ error: "Key already exists" });
      }
      seoData.titles.push({ key, title, description });
    }

    await seoData.save();
    res.status(201).json({ success: true, message: "SEO data added successfully" });
  } catch (error) {
    console.error("Error adding SEO data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a Specific Title & Description
const deleteSeoData = async (req, res) => {
  try {
    const { page, key } = req.params;

    const seoData = await Seo.findOne({ page });

    if (!seoData) {
      return res.status(404).json({ error: "SEO data not found" });
    }

    // Remove the entry with the matching key
    seoData.titles = seoData.titles.filter(entry => entry.key !== key);

    await seoData.save();
    res.status(200).json({ success: true, message: "SEO data deleted successfully" });
  } catch (error) {
    console.error("Error deleting SEO data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getSeoData, updateSeoData, addSeoData, deleteSeoData };
