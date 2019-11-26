const db = require('./../models');

module.exports = {
    findPart: async (req, res) => {
        const { partName } = req.body;
        try {
            const parts = await db.Part.find({
                name: partName
            });
            res.json({ parts });
        } catch(e) {
            res.json(e);
        }
    },

    findAll: async (req, res) => {
        try {
            const allParts = await db.Part.find();
            res.json(allParts);
        } catch(e) {
            res.json(e);
        }
    }
};
