// ===== DATABASE CONNECTION SETUP =====
// mysql2: Package to connect Node.js to MySQL database
const mysql = require("mysql2");

// ===== CREATE DATABASE CONNECTION =====
// This creates a connection pool to the MySQL database
// It establishes connection details needed to connect to our database
const db = mysql.createConnection({
  host: "localhost", // Where database is running (localhost = this computer)
  user: "root", // MySQL username (usually "root" by default)
  password: "", // MySQL password (empty string = no password)
  database: "surf_tracker", // Name of our database
});

// ===== CONNECT TO DATABASE =====
// Attempts to connect to the database and handles any errors
db.connect((err) => {
  if (err) {
    // If connection fails, print error message
    console.log("DB ERROR:", err.message);
  } else {
    // If connection succeeds, confirm in console
    console.log("MySQL connected!");
  }
});

// ===== EXPORT DATABASE CONNECTION =====
// Make this connection available to other files (routes) that need to query the database
module.exports = db;
