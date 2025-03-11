const mongoose = require("mongoose");
const Business = require("./Business");

const JobSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Business or job poster's name
  project: { type: String, required: true }, // Project or job title
  salary: { type: Number, required: true }, // Salary range (e.g., "50k-80k")
  deadline: { type: Date, required: true }, // Application deadline
  skills: { type: Array, required: true }, // Array of required skills
  businessId: { type: String, required: true }, // Business ID
  joinedOn: { type: Date, default: Date.now() },
});

const Employees = mongoose.model("Employees", JobSchema);
module.exports = Employees;
