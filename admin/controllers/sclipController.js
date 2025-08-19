const Sclip = require('../../sclip/models/Sclip'); // สมมติคุณสร้าง model Sclip แล้ว

exports.createSclip = async (req, res) => {
    try {
        const sclip = new Sclip(req.body);
        await sclip.save();
        res.status(201).json(sclip);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getSclips = async (req, res) => {
    try {
        const sclips = await Sclip.find();
        res.json(sclips);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateSclip = async (req, res) => {
    try {
        const sclip = await Sclip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(sclip);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteSclip = async (req, res) => {
    try {
        await Sclip.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
