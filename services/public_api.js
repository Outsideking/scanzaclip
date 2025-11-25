const express = require('express');
const fs = require('fs');
const path = require('path');

module.exports = {
    start: function(port) {
        const app = express();
        app.use(express.json());

        // Middleware ตรวจสอบ API Key
        app.use((req, res, next) => {
            const apiKey = req.headers['x-api-key'];
            if (!apiKey || apiKey !== process.env.API_KEY) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            next();
        });

        // Logging ทุก request
        app.use((req, res, next) => {
            const logMessage = `${new Date().toISOString()} [${req.method}] ${req.url}\n`;
            fs.appendFileSync(path.join(__dirname, '../../logs/public_api.log'), logMessage);
            next();
        });

        // ตัวอย่าง endpoint: /status
        app.get('/status', (req, res) => {
            res.json({ status: 'OK', timestamp: new Date().toISOString() });
        });

        // ตัวอย่าง endpoint: /run-task
        app.post('/run-task', (req, res) => {
            const { taskName } = req.body;
            // เรียกใช้งานโมดูลตาม taskName (ตัวอย่าง dummy)
            res.json({ message: `Task "${taskName}" ถูกเรียกใช้งานแล้ว` });
        });

        // Start server
        app.listen(port, () => console.log(`🌐 Public API รันบน port ${port}`));
    }
};
