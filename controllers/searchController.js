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
        let {name, partId } = req.query;
        const location = {
            latitude: 37.81340,
            longitude: -122.19900
        };
        const radius = 5000;
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
                'item._id': partId
            });
            const nearItems = invItems.filter(invItem => {
                const point = invItem.location;
                console.log({point, location, radius});
                return geolib.isPointInCircle(point, location , radius);
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
