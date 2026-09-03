// import express package
const express = require ("express");

// Import middleware
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

// Import routes
const indexRoutes = require("./routes");
const userRoutes = require("./routes/users/userRoutes");
const authRoutes = require("./routes/auth/authRoutes");
const authorRoutes = require("./routes/authors/authorRoutes");
const categoryRoutes = require("./routes/categories/categoryRoutes");
const bookRoutes = require("./routes/books/bookRoutes");
const borrowingRoutes = require("./routes/borrowings/borrowingRoutes");
// Create Express application
// app = whole project, start all routes with app (app.use)
const app = express();

// Add Middleware
// use helmet (security)
app.use(helmet());
// enable CORS
app.use(cors());
// log every request
app.use(morgan("dev"));
// parse JSON request body

// ==========================================
// ROUTES
// ==========================================
app.use(express.json());
// index(home) Routes
app.use("/", indexRoutes);
// userRoutes CREATE, GET, ID, UPDATE, DELETE
app.use("/api/users", userRoutes);
// authRoutes
app.use("/api/auth/login", authRoutes);

// AUTHOR routes
app.use("/api/authors", authorRoutes);

// CATEGORY routes
app.use("/api/categories", categoryRoutes);

// BOOK routes
app.use("/api/books", bookRoutes);

// BORROWING 
app.use("/api/borrow", borrowingRoutes);



// Home route move this in router folder
// app.get("/", (req, res)=> {
//     res.send("Libarry api running");
// });
// later we will have login register books and all routes,
//  so if here stay becomes messy 
// so we separate them inside routes folder

module.exports = app;