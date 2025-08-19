// routes/admin.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const adminController = require("../controllers/adminController");

// ใช้ authMiddleware ก่อนเข้า route admin
router.get("/dashboard", authMiddleware, adminController.getDashboard);
router.get("/users", authMiddleware, adminController.getUsers);
router.post("/users", authMiddleware, adminController.createUser);

module.exports = router;
