const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: true },
});

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip hashing if password is not modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
