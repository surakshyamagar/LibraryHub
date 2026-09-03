// const express = require("express");

// const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("Library Management API is Running 🚀");
// });

// module.exports = router;

const express = require("express");
const prisma = require("../config/prisma");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: "Database connected successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

module.exports = router;