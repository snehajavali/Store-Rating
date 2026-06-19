const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDashboard,
  createUser,
  createStore,
  getUsers,
  getStores,
  getUserById,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("ADMIN"),
  getDashboard
);

router.post(
  "/users",
  verifyToken,
  authorizeRoles("ADMIN"),
  createUser
);

router.post(
  "/stores",
  verifyToken,
  authorizeRoles("ADMIN"),
  createStore
);

router.get(
  "/users",
  verifyToken,
  authorizeRoles("ADMIN"),
  getUsers
);

router.get(
  "/stores",
  verifyToken,
  authorizeRoles("ADMIN"),
  getStores
);

router.get(
  "/users/:id",
  verifyToken,
  authorizeRoles("ADMIN"),
  getUserById
);

module.exports = router;