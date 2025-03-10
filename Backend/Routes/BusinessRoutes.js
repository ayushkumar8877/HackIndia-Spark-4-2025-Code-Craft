const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("Business Route");
});

// Import models
const Business = require("../Models/Business");
const JobPostings = require("../Models/JobPostings");
const Employees = require("../Models/Employees");
const Applications = require("../Models/Applications");
const BusinessProfile = require("../Models/BusinessProfile");

// Signup
router.post("/signup", async (req, res) => {
  const data = req.body; // Fixed destructuring
  console.log(data);
  try {
    if (await Business.findOne({ email: data.email })) {
      return res.status(400).json({ error: "Business already exists" });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const business = new Business({
      ...data,
      password: hashedPassword,
    });
    await business.save();
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const business = await Business.findOne({ email: req.body.email }); // Fixed findOne
    if (!business) {
      throw new Error("Business not found");
    }

    const isMatch = await bcrypt.compare(req.body.password, business.password);
    if (!isMatch) {
      throw new Error("Password is incorrect");
    }

    res.json({ success: true, id: business._id, name: business.name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add job postings
router.post("/postings", async (req, res) => {
  try {
    const job = new JobPostings(req.body);
    await job.save();
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get job postings
router.get("/postings", async (req, res) => {
  const id = req.query.id;
  try {
    const jobs = await JobPostings.find({ businessId: id });
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete posting
router.delete("/postings/:id", async (req, res) => {
  try {
    await JobPostings.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Hire employees
router.post("/hire", async (req, res) => {
  try {
    console.log(req.body);
    const employee = new Employees(req.body);
    await employee.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
  }
});

// Fetch hired employees
router.get("/hire", async (req, res) => {
  const id = req.query.id;
  try {
    const employees = await Employees.find({ businessId: id });
    res.json(employees);
  } catch (err) {
    console.log(err);
  }
});

// Display applications
router.get("/applications", async (req, res) => {
  const id = req.query.id;
  try {
    const applications = await Applications.find({ companyId: id });
    res.json(applications);
  } catch (err) {
    console.log(err);
  }
});

// Update application status
router.put("/applications", async (req, res) => {
  const { id, status } = req.body; // Destructure request body

  try {
    const application = await Applications.findByIdAndUpdate(
      id,
      { status }, // Correct format for updating fields
      { new: true } // Ensure it returns the updated document
    );

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    res.json({ success: true, application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Add Business Profile
router.post("/profile", async (req, res) => {
  try {
    const profile = new BusinessProfile(req.body);
    await profile.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
  }
});

// Check if profile is there or not
router.get("/checkprofile", async (req, res) => {
  const id = req.query.id;
  try {
    const isPresent = await BusinessProfile.findOne({ companyId: id });
    if (isPresent) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.log(err);
  }
});

// Get Profile Details
router.get("/profile", async (req, res) => {
  const id = req.query.id;
  try {
    const profile = await BusinessProfile.findOne({ companyId: id });
    res.json(profile);
  } catch (err) {
    console.log(err);
  }
});

// Update profile details
router.put("/profile", async (req, res) => {
  const { companyId, ...data } = req.body; // Destructure request body

  try {
    const profile = await BusinessProfile.findOneAndUpdate(
      { companyId },
      data, // Correct format for updating fields
      { new: true, upsert: true } // Ensure it returns the updated document and creates if not found
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
