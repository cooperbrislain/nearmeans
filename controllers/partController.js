const db = require('./../models');

module.exports = {
    createPart: async (req, res) => {
        const { partName } = req.body;
        const thePart = {
            name: partName
        };
        try {
            const result = await db.Part.create(thePart);
            await res.json(result);
        } catch (e) {
            await res.json(e);
        }
    },
    getParts: async (req, res) => {
        try {
            let parts = await db.Part.find();
            await res.json(parts);
        } catch (e) {
            await res.json(e);
        }
    },
    getPart: async (req, res) => {
        const { partId } = req.body;
        try {
            let part = await db.Part.findById(partId);
            await res.json(part);
        } catch (e) {
            await res.json(e);
        }
    },
    updatePart: async (req, res) => {
        const { partId, partData } = req.params;
        try {
            await db.Part.findByIdAndUpdate(partId, partData);
            await res.json({success:true});
        } catch (e) {
            await res.json(e);
        }
    },
    deletePart: async (req, res) => {
        const { partId } = req.params;
        try {
            await db.Part.findByIdAndDelete(partId);
            await res.json({success:true});
        } catch (e) {
            await res.json(e);
        }
    }
};
