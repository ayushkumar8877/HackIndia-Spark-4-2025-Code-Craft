const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
require("dotenv").config();

const router = express.Router();

// Initialize LinkedIn Strategy
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ["r_liteprofile", "r_emailaddress"],
      state: true,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || "",
        profileUrl: `https://www.linkedin.com/in/${profile.id}`,
      };
      return done(null, user);
    }
  )
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// LinkedIn Auth Route
router.get("/linkedin", passport.authenticate("linkedin"));

// LinkedIn Callback Route
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", { session: false }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.redirect(
      `${process.env.FRONTEND_URL}/freelancer/dashboard?token=${token}`
    );
  }
);

// Protected Route to Get User Info
router.get("/user", (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;
