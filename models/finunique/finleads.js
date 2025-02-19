const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: Number, required: true },
    message: { type: String, default: "" },
    submittedAt: { type: Date, default: Date.now }
});

// Use a distinct name for the Finunique model
const Form = mongoose.models.FinuniqueForm || mongoose.model("FinuniqueForm", formSchema);

module.exports = Form;
