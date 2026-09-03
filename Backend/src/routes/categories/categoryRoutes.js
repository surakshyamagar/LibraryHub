const express = require("express");
const { createCategory, getCategories, getCategoryById, putCategory, deleteCategory } = require("../../modules/categories/categoryController");
const authenticateUser = require("../../middleware/authMiddleware");
const { authorizeStaff } = require("../../middleware/authorizeRolesMiddleware");
const validateCategory = require("../../middleware/categoryValidation/validateCategory");

const router = express.Router();

router.post("/", validateCategory, authenticateUser, authorizeStaff,createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", authenticateUser, authorizeStaff, putCategory);
router.delete("/:id", authenticateUser, authorizeStaff, deleteCategory);

module.exports = router;