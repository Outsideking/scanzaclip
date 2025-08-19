const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const permissionsFile = path.join(__dirname, '../data/permissions.json');

// อ่านไฟล์ Permissions
app.get('/permissions', (req, res) => {
    fs.readFile(permissionsFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Cannot read permissions file' });
        res.json(JSON.parse(data));
    });
});

// เพิ่ม User ใหม่
app.post('/permissions/users', (req, res) => {
    const { id, name, alias, role_id, email, projects } = req.body;

    fs.readFile(permissionsFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Cannot read permissions file' });

        const json = JSON.parse(data);
        json.users.push({ id, name, alias, role_id, email, projects });

        fs.writeFile(permissionsFile, JSON.stringify(json, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Cannot write permissions file' });
            res.json({ message: 'User added successfully', user: { id, name } });
        });
    });
});

// แก้ไข Role ของ User
app.put('/permissions/users/:id', (req, res) => {
    const userId = req.params.id;
    const { role_id } = req.body;

    fs.readFile(permissionsFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Cannot read permissions file' });

        const json = JSON.parse(data);
        const user = json.users.find(u => u.id === userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.role_id = role_id;

        fs.writeFile(permissionsFile, JSON.stringify(json, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Cannot write permissions file' });
            res.json({ message: 'User role updated', user });
        });
    });
});

// ลบ User
app.delete('/permissions/users/:id', (req, res) => {
    const userId = req.params.id;

    fs.readFile(permissionsFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Cannot read permissions file' });

        const json = JSON.parse(data);
        const index = json.users.findIndex(u => u.id === userId);
        if (index === -1) return res.status(404).json({ error: 'User not found' });

        json.users.splice(index, 1);

        fs.writeFile(permissionsFile, JSON.stringify(json, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Cannot write permissions file' });
            res.json({ message: 'User deleted successfully' });
        });
    });
});

app.listen(PORT, () => console.log(`Admin API running on port ${PORT}`));
