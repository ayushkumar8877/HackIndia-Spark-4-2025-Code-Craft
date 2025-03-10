const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  joinedOn: {
    type: Date,
    default: Date.now,
  },
});

const Business = mongoose.model("business", businessSchema);
module.exports = Business;
