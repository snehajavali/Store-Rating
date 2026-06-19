const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const { getStores } = require("../controllers/storeController");

router.get("/", verifyToken, getStores);

module.exports = router;