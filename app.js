const express = require('express');
const mongoose = require('mongoose');
const app = express();
const roleRoutes = require('./permissions/routes/roles');

app.use(express.json());

// connect MongoDB
mongoose.connect('mongodb://localhost:27017/scanzaclip', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/api/roles', roleRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
