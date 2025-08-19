const express = require('express');
const router = express.Router();
const sclipController = require('../controllers/sclipController');
const { checkPermission } = require('../../permissions/permissions');

// ใช้ middleware ตรวจสอบสิทธิ์
router.post('/', checkPermission('CREATE_SCLIP'), sclipController.createSclip);
router.get('/', checkPermission('READ_SCLIP'), sclipController.getSclips);
router.put('/:id', checkPermission('UPDATE_SCLIP'), sclipController.updateSclip);
router.delete('/:id', checkPermission('DELETE_SCLIP'), sclipController.deleteSclip);

module.exports = router;
