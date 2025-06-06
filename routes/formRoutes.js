const express = require("express");
const router = express.Router();
const { submitForm, getAllForms } = require("../controllers/formController");

router.post("/submit-form", submitForm);
router.get("/forms", getAllForms); // New API for fetching form submissions

module.exports = router;
