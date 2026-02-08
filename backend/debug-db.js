const mysql = require("mysql2");

const c = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "surf_tracker",
});

c.query("SELECT id, username, password FROM users LIMIT 50", (err, results) => {
  if (err) {
    console.error("QUERY ERR", err);
    process.exit(1);
  }
  console.log("USERS", results);
  process.exit(0);
});
