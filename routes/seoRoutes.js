const express = require("express");
const { getSeoData, updateSeoData, addSeoData, deleteSeoData } = require("../controllers/seoController");

const router = express.Router();

router.get("/:page", getSeoData); // Get all titles/descriptions for a page
router.put("/:page/:key", updateSeoData); // Update a specific title/description
router.post("/:page", addSeoData); // Add a new title/description
router.delete("/:page/:key", deleteSeoData); // Delete a specific title/description

module.exports = router;
