const express = require('express');
const mongoose = require('mongoose');
const app = express();
const sclipRoutes = require('./routes/sclip');

app.use(express.json());

// connect MongoDB
mongoose.connect('mongodb://localhost:27017/scanzaclip', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// admin routes
app.use('/admin/sclips', sclipRoutes);

app.listen(4000, () => {
    console.log('Admin API running on http://localhost:4000');
});
