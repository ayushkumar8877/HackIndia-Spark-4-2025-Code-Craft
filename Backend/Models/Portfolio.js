const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  freelancerId: { type: String, required: true },
  title: { type: String, required: true },
  categories: { type: [String], required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: "" }, // URL for project image
  liveDemoUrl: { type: String, default: "" }, // Optional live demo link
  repositoryUrl: { type: String, default: "" }, // Optional GitHub repo link
  createdAt: { type: Date, default: Date.now },
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

module.exports = Portfolio;
