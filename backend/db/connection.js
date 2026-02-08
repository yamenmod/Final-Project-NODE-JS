// db setup
// mysql2 - connects to db
const mysql = require("mysql2");

// create connection
// connection pool to mysql
// setup connection detials
const db = mysql.createConnection({
  host: "localhost", // Where database is running (localhost = this computer)
  user: "root", // MySQL username (usually "root" by default)
  password: "", // MySQL password (empty string = no password)
  database: "surf_tracker", // Name of our database
});

// connect to db
// try to connect & handle errors
db.connect((err) => {
  if (err) {
    // connection failed
    // log full error object so we can see code/details
    console.log("DB ERROR:", err);
  } else {
    // nice we're connected
    console.log("MySQL connected!");
  }
});

// export the db
// make it available for routes
module.exports = db;
