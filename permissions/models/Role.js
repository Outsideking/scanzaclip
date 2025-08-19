const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    permissions: { type: [String], default: [] } // list ของสิทธิ์เช่น ["CREATE_SCLIP", "DELETE_SCLIP"]
}, { timestamps: true });

module.exports = mongoose.model('Role', RoleSchema);
