# Backend Explanation for Surf Spots App

## Project Overview

This is a Node.js/Express backend API for a Surf Spots tracking application. Users can create accounts, add surf spots, and manage their favorite locations.

---

## Key Concepts to Study

### 1. **What is Node.js + Express?**

- **Node.js**: JavaScript runtime that allows you to run JavaScript on the server (not just in browsers)
- **Express**: Framework that makes building web servers and APIs easier. It handles:
  - Routing (mapping URLs to functions)
  - Middleware (processing requests before they reach routes)
  - Request/Response handling

### 2. **What is API (Application Programming Interface)?**

- A way for the frontend to talk to the backend
- Uses HTTP methods: GET (retrieve), POST (create), PUT (update), DELETE (remove)
- Routes are specified with paths like `/auth/login`, `/spots`, etc.

### 3. **What are Middleware?**

Functions that process requests before they reach the main route handlers.
Examples in our app:

- **CORS**: Allows frontend at localhost:3000 to access backend at localhost:5000
- **bodyParser**: Converts incoming JSON to JavaScript objects
- **session**: Manages user login state across requests
- **cookieParser**: Reads cookies from requests

### 4. **What is Sessions?**

- Keeps users logged in across multiple requests
- Stores user data in memory (or database) using encrypted cookies
- When user logs in, session is created. When they log out, session is destroyed.
- Session duration: 2 hours (then user must login again)

### 5. **What is SQL Injection Prevention (the ? placeholders)?**

- When you write `WHERE username=?`, the `?` is replaced with actual value
- This prevents hackers from injecting malicious SQL code
- Example of BAD code (unsafe):
  ```javascript
  // NEVER DO THIS!
  const sql = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
  ```
- This is SAFE (what we do):
  ```javascript
  const sql = "SELECT * FROM users WHERE username=? AND password=?";
  db.query(sql, [username, password], ...);
  ```

---

## Project Structure

```
backend/
├── server.js                 # Main server file (starts app, sets up middleware)
├── package.json             # Project dependencies and scripts
├── db/
│   └── connection.js        # Database connection setup
└── routes/
    ├── auth.js              # Login, Register, Logout routes
    ├── spots.js             # Create, Read, Update, Delete spots
    └── userSpots.js         # User's favorite spots management
```

---

## Dependencies Explained

### In `package.json`:

```json
"dependencies": {
  "body-parser": "^2.2.2",      // Parses incoming JSON from frontend requests
  "cookie-parser": "^1.4.7",    // Reads cookies sent with requests
  "cors": "^2.8.5",             // Allows frontend to make requests to backend
  "express": "^5.2.1",          // Main framework for building API
  "express-session": "^1.19.0", // Manages user sessions (login state)
  "mysql2": "^3.16.1"           // Connects to MySQL database
}
```

---

## API Routes Summary

### Authentication Routes (`/auth`)

| Method | Route            | Description                    |
| ------ | ---------------- | ------------------------------ |
| POST   | `/auth/login`    | Login with username & password |
| POST   | `/auth/register` | Create new account             |
| GET    | `/auth/session`  | Check if user is logged in     |
| POST   | `/auth/logout`   | Destroy user session (logout)  |

### Surf Spots Routes (`/spots`)

| Method | Route                 | Description                   |
| ------ | --------------------- | ----------------------------- |
| GET    | `/spots/:user_id`     | Get all spots created by user |
| POST   | `/spots`              | Create new surf spot          |
| PUT    | `/spots/:id/:user_id` | Update spot (owner only)      |
| DELETE | `/spots/:id/:user_id` | Delete spot (owner only)      |

### User Favorites Routes (`/userSpots`)

| Method | Route                                   | Description               |
| ------ | --------------------------------------- | ------------------------- |
| POST   | `/userSpots/select`                     | Add spot to favorites     |
| GET    | `/userSpots/selected`                   | Get user's favorite spots |
| DELETE | `/userSpots/unselect/:user_id/:spot_id` | Remove from favorites     |

---

## How the App Works (Flow)

### 1. User Registration Flow

```
Frontend: User fills register form
   ↓
Frontend sends POST to /auth/register with username, password, email
   ↓
Backend receives POST request → Extracts data → Validates in database
   ↓
Database: INSERT new user into users table
   ↓
Backend sends response: "User registered!"
```

### 2. User Login Flow

```
Frontend: User enters credentials
   ↓
Frontend sends POST to /auth/login with username & password
   ↓
Backend: Queries database for user matching those credentials
   ↓
User found? → Create SESSION with user's ID and username
   ↓
Backend sends response with user data + sets session
   ↓
Frontend stores user in localStorage
```

### 3. Add Surf Spot Flow

```
Frontend: User fills form (spot name, difficulty, type, location)
   ↓
Frontend sends POST to /spots with spot data + user_id
   ↓
Backend: INSERT spot into surfspots table with user_id
   ↓
Frontend reloads spots list from GET /spots/:user_id
```

### 4. Update/Delete Spot Flow

```
Frontend: User clicks Edit/Delete button
   ↓
Frontend sends PUT/DELETE to /spots/:id/:user_id
   ↓
Backend: CHECK if user_id matches (security - only owner can modify)
   ↓
Backend: UPDATE or DELETE the spot
   ↓
Frontend reloads spots list
```

---

## Database Tables

### users table

| Column   | Type                | Description                |
| -------- | ------------------- | -------------------------- |
| id       | INT, AUTO_INCREMENT | Unique user ID             |
| username | VARCHAR             | User's login name (UNIQUE) |
| password | VARCHAR             | User's password            |
| email    | VARCHAR             | User's email               |

### surfspots table

| Column     | Type                | Description                    |
| ---------- | ------------------- | ------------------------------ |
| id         | INT, AUTO_INCREMENT | Unique spot ID                 |
| spot_name  | VARCHAR             | Name of the surf spot          |
| difficulty | VARCHAR             | Beginner/Intermediate/Advanced |
| type       | VARCHAR             | Beach/Reef/Point-break         |
| location   | VARCHAR             | Geographic location            |
| user_id    | INT (FK)            | Who created this spot          |

### user_spots table (Junction table - for favorites)

| Column  | Type     | Description |
| ------- | -------- | ----------- |
| user_id | INT (FK) | User ID     |
| spot_id | INT (FK) | Spot ID     |

---

## Important Concepts for Exam

### 1. **HTTP Methods**

- **GET**: Retrieve data (no body usually)
- **POST**: Create data (sends body)
- **PUT**: Update existing data (sends body)
- **DELETE**: Remove data

### 2. **Status Codes**

- **200**: Success
- **201**: Created successfully
- **400**: Bad request (client error)
- **401**: Unauthorized (login failed)
- **500**: Server error

### 3. **req.body vs req.params**

- **req.body**: Data sent in request body (POST/PUT requests)
- **req.params**: Data in URL `/spots/:user_id` (user_id is param)

### 4. **Callbacks vs Promises**

Our code uses callbacks:

```javascript
db.query(sql, [values], (err, results) => {
  // This function runs when query completes
  if (err) {
    /* handle error */
  }
  // Use results here
});
```

### 5. **Security Best Practices**

- ✅ Use `?` placeholders to prevent SQL injection
- ✅ Check user_id matches to prevent unauthorized access
- ✅ Use sessions to maintain login state
- ✅ Validate input on both frontend AND backend

---

## How to Run

```bash
# Install dependencies
npm install

# Start server
npm start

# Server runs on http://localhost:5000
```

---

## Exam Study Tips

1. **Understand the difference between routes**: Each route does something specific
2. **Know the HTTP methods**: GET needs no body, POST/PUT need data
3. **SQL Queries are important**: SELECT, INSERT, UPDATE, DELETE
4. **Session management**: How users stay logged in
5. **Error handling**: Always check for database errors
6. **Security**: Always validate and check user ownership

Good luck on your exam! 🚀
