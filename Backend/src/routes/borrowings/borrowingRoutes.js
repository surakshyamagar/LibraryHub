const express = require("express");
const { createBorrowing, getBorrowingById, getBorrowings, updateBorrowing, deleteBorrowing, returnBorrowing, searchBorrowings, filterBorrowings, paginateBorrowings, getMyBorrowings } = require("../../modules/borrowings/borrowingController");
const authenticateUser = require("../../middleware/authMiddleware");
const { authorizeStaff } = require("../../middleware/authorizeRolesMiddleware");

const router = express.Router();

router.post("/", authenticateUser, authorizeStaff, createBorrowing);
router.get("/", authenticateUser, authorizeStaff, getBorrowings);
router.get("/my", authenticateUser, getMyBorrowings);
router.get("/search",authenticateUser, authorizeStaff, searchBorrowings);
router.get("/paginate",authenticateUser,authorizeStaff, paginateBorrowings);
router.get("/:id",authenticateUser, authorizeStaff, getBorrowingById);
router.put("/:id",authenticateUser, authorizeStaff, updateBorrowing);
router.delete("/:id",authenticateUser, authorizeStaff, deleteBorrowing);
router.patch("/:id/return",authenticateUser,authorizeStaff, returnBorrowing);


module.exports = router;

