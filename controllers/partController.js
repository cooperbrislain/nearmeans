const db = require('./../models');

module.exports = {
    createPart: async (req, res) => {
        const { partName } = req.body;

        const thePart = {
            name: partName
        };
        console.log(thePart);
        try {
            let result = await db.Part.create(thePart);
            res.json(result);
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    },
    getParts: async (req, res) => {
        try {
            let parts = await db.Part.find();
            res.json(parts);
        } catch (e) {
            res.json(e);
        }
    },
    getPart: async (req, res) => {
        const { partId } = req.body;
        try {
            let part = await db.Part.findById(partId);
            res.json(part);
        } catch (e) {
            res.json(e);
        }
    },
    updatePart: async (req, res) => {
        const { partId, partData } = req.params;
        try {
            await db.Part.findByIdAndUpdate(partId, partData);
        } catch (e) {

        }
    },
    deletePart: async (req, res) => {
        const { partId } = req.params;
        console.log(`deleting part ${partId}`);
        try {
            await db.Part.findByIdAndDelete(partId);
            res.json({});
        } catch (e) {
            res.json(e);
        }
    }
};
