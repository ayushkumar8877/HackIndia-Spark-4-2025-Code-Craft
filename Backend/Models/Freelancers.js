const mongoose = require("mongoose");

const freelancerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  joinedOn: {
    type: Date,
    default: Date.now,
  },
});

const Freelancer = mongoose.model("freelancer", freelancerSchema);
module.exports = Freelancer;
