const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: Array,
    required: true,
  },
  salary: {
    type: String, // Assuming salary is numeric
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  urgent: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    required: true,
  },
  businessId: { type: String, required: true }, // Business ID
  postedOn: {
    type: Date,
    default: Date.now,
  },
});

const JobPostings = mongoose.model("JobPostings", jobSchema);
module.exports = JobPostings;
