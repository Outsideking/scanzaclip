// services/userService.js

// mockup user data
let users = [
  { id: 1, name: "Alice", role: "user" },
  { id: 2, name: "Bob", role: "admin" },
];

// ดึงผู้ใช้ทั้งหมด
exports.getAllUsers = () => {
  return users;
};

// เพิ่มผู้ใช้ใหม่
exports.createUser = (name, role) => {
  const newUser = { id: Date.now(), name, role };
  users.push(newUser);
  return newUser;
};
