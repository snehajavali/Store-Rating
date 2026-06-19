const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const {
  submitRating,
  updateRating,
} = require("../controllers/ratingController");

router.post("/", verifyToken, submitRating);

router.put("/:id", verifyToken, updateRating);

module.exports = router;