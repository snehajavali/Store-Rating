const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const { ownerDashboard } = require("../controllers/storeController");

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("OWNER"),
  ownerDashboard
);

module.exports = router;