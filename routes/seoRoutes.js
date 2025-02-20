const express = require("express");
const { updateSeoData } = require("../controllers/seoController");

const router = express.Router();
 
// Update SEO Data (title & description)
router.put("/:page", updateSeoData);  // Example: PUT /api/seo/home
 
module.exports = router;
