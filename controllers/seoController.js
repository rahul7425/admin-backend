const Seo = require("../models/SEO");

// Get SEO Data for a Page  
const getSeoData = async (req, res) => {
  try {  
    const { page } = req.params;
    const seoData = await Seo.findOne({ page });

    if (!seoData) {
      return res.status(404).json({ error: "SEO data not found for this page" });
    }

    res.status(200).json({
      success: true,
      data: {
        title: seoData.title,
        description: seoData.description
      }
    });
  } catch (error) {
    console.error("Error fetching SEO data:", error);
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
      // If no SEO data exists for the page, create new entry
      seoData = new Seo({
        page,
        title,
        description
      });
    } else {
      // Update the existing SEO data for the page
      if (title) seoData.title = title;
      if (description) seoData.description = description;
    }

    // Save the updated SEO data to the database
    await seoData.save();
    res.status(200).json({ success: true, message: "SEO data updated successfully" });
  } catch (error) {
    console.error("Error updating SEO data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Add SEO Data (Title & Description for a Page)
const addSeoData = async (req, res) => {
  try {
    const { page } = req.params;
    const { title, description } = req.body;

    let seoData = await Seo.findOne({ page });

    if (!seoData) {
      // If no SEO data exists for the page, create new entry
      seoData = new Seo({
        page,
        title,
        description
      });
    } else {
      // If SEO data exists, update the title and description
      seoData.title = title;
      seoData.description = description;
    }

    await seoData.save();
    res.status(201).json({ success: true, message: "SEO data added successfully" });
  } catch (error) {
    console.error("Error adding SEO data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete SEO Data (Title & Description for a Page)
const deleteSeoData = async (req, res) => {
  try {
    const { page } = req.params;

    const seoData = await Seo.findOne({ page });

    if (!seoData) {
      return res.status(404).json({ error: "SEO data not found" });
    }

    await Seo.deleteOne({ page });  // Remove the SEO data entry for the page

  res.status(200).json({ success: true, message: "SEO data deleted successfully" });
  } catch (error) {
    console.error("Error deleting SEO data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getSeoData, updateSeoData, addSeoData, deleteSeoData };
