const db = require('./../models');
const geolib = require('geolib');

module.exports = {
    findPart: async (req, res) => {
        const { partName } = req.body;
        try {
            const invItems = await db.Inventory.find({
                "item.name": partName
            });
            res.json({ invItems });
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
        let { name, partId } = req.query;
        const location = {
            latitude: 51.5,
            longitude: 7.5
        };
        const radius = 50000;
        if (name) {
            try {
                const part = db.Part.find({name});
                partId = part._id;
            } catch (e) {
                res.json(e);
            }
        }
        try {
            const invItems = await db.Inventory.find({
                'item._id': partId,
                qty: { $gt: 0 }
            });
            const nearItems = invItems.filter(invItem => {
                const point = invItem.location;
                console.log(geolib.getDistance(location, point));
                return geolib.getDistance(location, point) < radius;
            });
            res.json(nearItems);
        } catch (e) {
            res.json(e);
        }
    },

    findInRadiusOf: async (req, res) => {
        res.json({success:true});
    }
};
