const express = require("express");
const { addSeoData, updateSeoData, getSeoData } = require("../controllers/seoController");

const router = express.Router();

// Add new SEO Data
router.post("/", addSeoData); // Example: POST /api/seo

// Update existing SEO Data
router.put("/:page", updateSeoData);  // Example: PUT /api/seo/home

// Get SEO Data for a specific page
router.get("/:page", getSeoData); // Example: GET /api/seo/home

module.exports = router;
