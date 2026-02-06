// ===== IMPORTING REQUIRED MODULES =====
// express: Framework for building Node.js web applications (handles routing, middleware, etc.)
const express = require("express");

// cors: Allows requests from different domains (frontend at localhost:3000 to backend at localhost:5000)
const cors = require("cors");

// bodyParser: Middleware to parse incoming request bodies (especially JSON data from frontend)
const bodyParser = require("body-parser");

// express-session: Middleware to manage user sessions (stores user login data)
const session = require("express-session");

// cookieParser: Middleware to parse cookies from requests
const cookieParser = require("cookie-parser");

// ===== CREATE EXPRESS APP =====
// This creates the main Express application instance
const app = express();

// ===== MIDDLEWARE SETUP =====

// CORS Middleware: Allows frontend at localhost:3000 to make requests to this backend
// origin: specifies which domain can access this API
// credentials: true allows cookies and sessions to be sent with requests
app.use(
  cors({
    origin: "http://localhost:3000", // Only allow frontend domain
    credentials: true, // Allow cookies/sessions in requests
  }),
);

// Cookie Parser Middleware: Parses cookies from incoming requests
app.use(cookieParser());

// Body Parser Middleware: Converts incoming JSON request bodies into JavaScript objects we can use
app.use(bodyParser.json());

// ===== SESSION MIDDLEWARE =====
// This allows us to keep users logged in across requests
app.use(
  session({
    secret: "super_secret_key", // Secret key to encode session data (prevents tampering)
    resave: false, // Don't save session if nothing changed
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
      secure: false, // Set to false for localhost (set to true for HTTPS in production)
      maxAge: 1000 * 60 * 60 * 2, // Session lasts 2 hours (in milliseconds)
    },
  }),
);

// ===== IMPORT ROUTE FILES =====
// These files contain the API endpoints for different features
const authRoutes = require("./routes/auth"); // Login, Register, Logout routes
const spotsRoutes = require("./routes/spots"); // Create, Read, Update, Delete surf spots
const userSpotsRouter = require("./routes/userSpots"); // Routes for user's favorite spots

// ===== REGISTER ROUTES WITH PATHS =====
// When someone visits /auth, use the authRoutes
// When someone visits /spots, use the spotsRoutes
// When someone visits /userSpots, use the userSpotsRouter
app.use("/auth", authRoutes);
app.use("/spots", spotsRoutes);
app.use("/userSpots", userSpotsRouter);

// ===== TEST ROUTE =====
// Simple GET route to test if backend is running
app.get("/", (req, res) => {
  res.send("Backend running");
});

// ===== START SERVER =====
// Listen on port 5000 for incoming requests
// When server starts, print a message to console
app.listen(5000, () => console.log("Server running on 5000"));
