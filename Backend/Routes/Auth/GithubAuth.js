const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const GithubStrategy = require("passport-github2").Strategy;
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Session Middleware (Important!)
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

router.use(cookieParser());
router.use(passport.initialize());
router.use(passport.session());

// GitHub Strategy Setup
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        username: profile.username,
        avatar_url: profile.photos?.[0]?.value,
      };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// GitHub OAuth Route
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth Callback Route
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    if (!req.user) return res.redirect("/");

    // Generate JWT Token
    const token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set user data in cookies
    res.cookie("username", req.user.username);
    res.cookie("avatar_url", req.user.avatar_url);

    // Redirect with token
    res.redirect(
      `${process.env.FRONTEND_URL}/freelancer/dashboard?token=${token}`
    );
  }
);

// Logout Route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy();
    res.clearCookie("userData"); // Clear user data from cookies
    res.redirect(process.env.FRONTEND_URL);
  });
});

module.exports = router;
