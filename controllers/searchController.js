const db = require('./../models');

module.exports = {
    findPart: async (req, res) => {
        const { partName } = req.body;
        try {
            const invItems = await db.Inventory.find({
                "item.name": partName
            });
            res.json({ invItemss });
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
    },

    findAllInRadius: async (req, res) => {
        let { name, partId, location, radius } = req.query;
        if (name) {
            try {
                const part = db.Part.find({ name });
                partId = part._id;
            } catch(e) {
                res.json(e);
            }
        }
        try {
            const invItems = await db.Inventory.find({
                'item._id': partId
            });
            res.json(invItems);
        } catch(e) {
            res.json(e);
        }
    }
    // geolib.isPointInCircle(object latlng, object center, integer radius)
};
