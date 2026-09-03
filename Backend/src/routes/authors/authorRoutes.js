const express = require ("express");
const { createAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor } = require("../../modules/authors/authorController");
const authenticateUser = require("../../middleware/authMiddleware");
const { authorizeStaff } = require("../../middleware/authorizeRolesMiddleware");
const validateAuthor = require("../../middleware/authorValidation/validateAuthor");

const router = express.Router();

router.post("/", validateAuthor, authenticateUser, authorizeStaff ,createAuthor);
router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.put("/put/:id", authenticateUser, authorizeStaff, updateAuthor);
router.delete("/delete/:id", authenticateUser, authorizeStaff ,deleteAuthor);

module.exports = router;
