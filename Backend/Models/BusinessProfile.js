const mongoose = require("mongoose");

const BusinessProfileSchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
    }, // Reference to Business User
    industry: { type: String, required: true },
    companySize: { type: String, required: true }, // e.g., "1-10", "11-50", "51-200"
    description: { type: String, required: true },
    website: { type: String },
    hiringNeeds: { type: String }, // Describe hiring plans
    location: { type: String, required: true },
    contactPhone: { type: String, required: true },
  },
  { timestamps: true }
);

const BusinessProfile = mongoose.model(
  "BusinessProfile",
  BusinessProfileSchema
);
module.exports = BusinessProfile;
