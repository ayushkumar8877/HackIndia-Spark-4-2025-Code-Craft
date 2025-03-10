const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Secure in production
  })
);

// Routes
const GithubAuth = require("./Routes/Auth/GithubAuth");
const LinkedInAuth = require("./Routes/Auth/LinkedInAuth");
const BusinessAuth = require("./Routes/Auth/BusinessAuth");

app.use("/auth", GithubAuth);
app.use("/auth2", LinkedInAuth);
app.use("/auth/business", BusinessAuth);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
