const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.use(express.json()); // Parses incoming JSON data
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

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

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Routes
const GithubAuth = require("./Routes/Auth/GithubAuth");
const LinkedInAuth = require("./Routes/Auth/LinkedInAuth");
const BusinessAuth = require("./Routes/Auth/BusinessAuth");
const Freelancer = require("./Routes/FreelancerRoutes");
const Business = require("./Routes/BusinessRoutes");

app.use("/auth", GithubAuth);
app.use("/auth2", LinkedInAuth);
app.use("/auth/business", BusinessAuth);
app.use("/freelancer", Freelancer);
app.use("/business", Business);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
