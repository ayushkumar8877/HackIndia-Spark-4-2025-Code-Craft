const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("Business Route");
});

// Import models
const Business = require("../Models/Business");

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

module.exports = router;
