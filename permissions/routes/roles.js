const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

// สร้าง Role ใหม่
router.post('/', async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        res.status(201).json(role);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ดึง Role ทั้งหมด
router.get('/', async (req, res) => {
    const roles = await Role.find();
    res.json(roles);
});

module.exports = router;
