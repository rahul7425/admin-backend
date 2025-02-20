const Seo = require("../models/SEO");
 
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

module.exports = { updateSeoData };
