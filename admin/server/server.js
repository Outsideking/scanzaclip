const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../ui')));

// Load data
let users = JSON.parse(fs.readFileSync('./data/users.json'));
let sclips = JSON.parse(fs.readFileSync('./data/sclips.json'));

// API endpoints
app.get('/admin/users', (req, res) => res.json(users));
app.get('/admin/sclips', (req, res) => res.json(sclips));

// Real-time chat
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('send-message', (msg) => {
        // Broadcast message
        io.emit('receive-message', msg);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Admin server running on port ${PORT}`));
