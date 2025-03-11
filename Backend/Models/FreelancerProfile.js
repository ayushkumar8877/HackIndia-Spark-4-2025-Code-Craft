const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  location: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  github: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the timestamp before saving
ProfileSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("FreelancerProfile", ProfileSchema);
