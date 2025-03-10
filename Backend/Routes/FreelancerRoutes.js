const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Models
const Freelancer = require("../Models/Freelancers");
const Applications = require("../Models/Applications");

// Hash Password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Signup
router.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    if (await Freelancer.findOne({ email: data.email })) {
      return res.json({
        status: "exists",
        error: "Freelancer already exists!",
      });
    }
    data.password = await hashPassword(data.password);
    const freelancer = new Freelancer(data);
    await freelancer.save();
    res.status(200).send({ status: "success" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  const data = req.body;
  try {
    const freelancer = await Freelancer.findOne({
      email: data.email,
    });
    if (!freelancer) {
      return res.json({
        status: "error",
        error: "Freelancer does not exist!",
      });
    }

    const isMatch = await bcrypt.compare(data.password, freelancer.password);

    if (!isMatch) {
      return res.json({
        status: "error",
        error: "Invalid credentials!",
      });
    }

    res
      .status(200)
      .send({ status: "success", id: freelancer._id, name: freelancer.name });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Submit application
router.post("/apply", async (req, res) => {
  try {
    const application = new Applications(req.body);
    await application.save();
    res.status(200).send({ status: "success" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
