const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  companyId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  project: { type: String, required: true },
  appliedDate: { type: Date, required: true },
  experience: { type: Number, required: true },
  skills: { type: Array, required: true },
  status: {
    type: String,
    enum: ["Applied", "Interviewing", "Hired", "Rejected"],
    default: "Applied",
  },
});

const Applications = mongoose.model("Applications", ApplicationSchema);
module.exports = Applications;
