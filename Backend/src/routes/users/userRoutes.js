const express = require("express");
const { createUser, getUsers, getUserById, updateUser, deleteUser, updateUserRole } = require("../../modules/users/userController");
const validateUser = require("../../middleware/validateUser");
const authenticateUser = require("../../middleware/authMiddleware");
const { authorizeStaff, authorizeAdmin } = require("../../middleware/authorizeRolesMiddleware");
const authorizeUserUpdate = require("../../middleware/authorizeUserUpdate");

// creates mini Express Appl (Router)
const router = express.Router();

// CREATE/ POST/ REGISTER user (POST /api/users)
router.post("/", validateUser, createUser);

// GET all users (GET /api/users) ADMIN + STAFF
router.get("/", authenticateUser, authorizeStaff, getUsers);

// GET user by ID (/api/users/:id) ADMIN + STAFF
router.get("/:id", authenticateUser, authorizeStaff, getUserById);

// UPDATE by Id (/api/users/1) ADMIN + STAFF
router.put("/:id", authenticateUser, authorizeStaff, authorizeUserUpdate, updateUser);

// DELETE Id (Admin only)
router.delete("/:id", authenticateUser,authorizeAdmin, deleteUser);

// UPDATE user Role (PATCH /api/users/:id/role) ADMIN only
router.patch("/:id/role", authenticateUser, authorizeAdmin, updateUserRole);

module.exports = router;