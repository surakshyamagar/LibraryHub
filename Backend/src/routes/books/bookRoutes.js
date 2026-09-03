const express = require("express");

const { createBook, getBooks, getBookById, updateBook, deleteBook } = require("../../modules/books/bookController");
const authenticateUser = require("../../middleware/authMiddleware");
const { authorizeStaff } = require("../../middleware/authorizeRolesMiddleware");
const validateBook = require("../../middleware/bookValidation/validateBook");

const router = express.Router();

router.post("/", validateBook, authenticateUser, authorizeStaff, createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", authenticateUser, authorizeStaff, updateBook);
router.delete("/:id", authenticateUser, authorizeStaff,  deleteBook);

module.exports = router;