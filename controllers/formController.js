const Form = require("../models/Form");
const sendEmail = require("../services/emailService");

// Submit Form API
const submitForm = async (req, res) => {
    try {
        const { fullName, email, number, message } = req.body;

        if (!fullName || !email || !number) {
            return res.status(400).json({ error: "Full name, email, and number are required." });
        }

        // Save form details in MongoDB
        const newForm = new Form({ fullName, email, number, message });
        await newForm.save();

        // Send Email to Office
        await sendEmail({ fullName, email, number, message });

        res.status(201).json({ success: true, message: "Form submitted successfully" });
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get All Forms API (for admin panel)
const getAllForms = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;
        const query = {};

        // Search functionality
        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { number: { $regex: search, $options: "i" } }
            ];
        }

        const forms = await Form.find(query)
            .sort({ submittedAt: -1 }) // Sort by latest submissions
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Form.countDocuments(query);

        res.status(200).json({
            success: true,
            data: forms,
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

module.exports = { submitForm, getAllForms };
