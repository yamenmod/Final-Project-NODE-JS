
// express - routing & middleware stuff
const express = require("express");

// cors lets frontend talk to backend without issues
const cors = require("cors");

// bodyParser parses json request bodies
const bodyParser = require("body-parser");

// session middleware keeps users logged in
const session = require("express-session");

// cookieParser reads cookies from requests
const cookieParser = require("cookie-parser");

// create the app
// main express instance
const app = express();

// setup middleware

// cors stuff - lets frontend connect
// origin - only localhost:3000 can access
// credentials - allow cookies & sesions
app.use(
  cors({
    origin: "http://localhost:3000", // Only allow frontend domain
    credentials: true, // Allow cookies/sessions in requests
  }),
);

// parse the cookies
app.use(cookieParser());

// parse json from requests
app.use(bodyParser.json());

// session stuff
// keeps users logged in
app.use(
  session({
    secret: "super_secret_key", // Secret key
    resave: false, // Dont save session if nothing changed
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
      secure: false, // Set to false for localhost (set to true for HTTPS in production)
      maxAge: 1000 * 60 * 60 * 2, // Session lasts 2 hours (in milliseconds)
    },
  }),
);

// import route files
// all the api endpoints
const authRoutes = require("./routes/auth"); // Login, Register, Logout routes
const spotsRoutes = require("./routes/spots"); // Create, Read, Update, Delete surf spots *CRUD*
const userSpotsRouter = require("./routes/userSpots"); // Routes for user's favorite spots

// register routes
// /auth for login & register
// /spots for surf spot stuff
// /userSpots for user favorites
app.use("/auth", authRoutes);
app.use("/spots", spotsRoutes);
app.use("/userSpots", userSpotsRouter);

// test if backend works
app.get("/", (req, res) => {
  res.send("Backend running"); // message to know it runs
});

// start the server
// listen on 5000 for requests
// log when its up
app.listen(5000, () => console.log("Server running on 5000"));
