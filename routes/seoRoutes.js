const express = require("express");
const { getSeoData, updateSeoData, addSeoData, deleteSeoData } = require("../controllers/seoController");

const router = express.Router();

// Get SEO Data for a Page (title & description)
router.get("/:page", getSeoData);  // Example: GET /api/seo/home

// Update SEO Data (title & description)
router.put("/:page", updateSeoData);  // Example: PUT /api/seo/home

// Add SEO Data (title & description) for a page
router.post("/:page", addSeoData);  // Example: POST /api/seo/home

// Delete SEO Data for a page
router.delete("/:page", deleteSeoData);  // Example: DELETE /api/seo/home

module.exports = router;
