const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Business Route");
});

// Import models
const Business = require("../Models/Business");

// Create a new business
router.post("/", async (req, res) => {
  const { data } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const business = new Business({
      ...data,
      password: hashedPassword,
    });
    await business.save();
    res.json(business);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login a business
router.post("/login", async (req, res) => {
  try {
    const business = await Business.findOne(req.body.email);
    if (!business) {
      throw new Error("Business not found");
    }

    const isMatch = await bcrypt.compare(req.body.password, business.password);
    if (!isMatch) {
      throw new Error("Password is incorrect");
    }

    res.json({ success: true, id: business._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
