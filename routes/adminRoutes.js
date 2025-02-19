const express = require("express");
const { loginAdmin } = require("../controllers/adminController");

const router = express.Router();

// Admin login route
router.post("/admin/login", loginAdmin);

module.exports = router;
