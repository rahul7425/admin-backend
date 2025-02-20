const express = require("express");
const { updateSeoData, getSeoData } = require("../controllers/seoController");

const router = express.Router();

// Update SEO Data (title & description) for any page (e.g., home, about, service, etc.)
router.put("/:page", updateSeoData);  // Example: PUT /api/seo/home, PUT /api/seo/about, etc.

// Get SEO Data for a specific page
router.get("/:page", getSeoData); // Example: GET /api/seo/home, GET /api/seo/about, etc.

module.exports = router;
