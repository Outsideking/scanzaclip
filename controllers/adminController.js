// controllers/adminController.js

// ตัวอย่าง mockup ฟังก์ชัน admin
exports.getDashboard = (req, res) => {
  res.json({
    message: "Welcome to Admin Dashboard",
    user: req.user, // มาจาก auth middleware
  });
};

exports.getUsers = (req, res) => {
  // mockup ข้อมูล user
  const users = [
    { id: 1, name: "Alice", role: "user" },
    { id: 2, name: "Bob", role: "admin" },
  ];
  res.json(users);
};

exports.createUser = (req, res) => {
  const { name, role } = req.body;
  res.json({
    message: "User created successfully",
    user: { id: Date.now(), name, role },
  });
};
// controllers/adminController.js
const userService = require("../services/userService");

exports.getDashboard = (req, res) => {
  res.json({
    message: "Welcome to Admin Dashboard",
    user: req.user,
  });
};

exports.getUsers = (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
};

exports.createUser = (req, res) => {
  const { name, role } = req.body;
  const newUser = userService.createUser(name, role);
  res.json({
    message: "User created successfully",
    user: newUser,
  });
};
