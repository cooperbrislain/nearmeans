const db = require('./../models');
const geolib = require('geolib');
const axios = require('axios');
const config = require('./../config/keys');

const miles_to_meters = x => x*1609.344;

const convertZipToGeoCode = async (zipCode) => {
    const { results } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${config.google_api_key}`);
    const geoCode = results[0].geometry.location;
    return geoCode;
};

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
        let { name, partId, searchZip, searchDistance } = req.body;
        console.log(req);
        console.log(`SEARCHING FOR PART NAMED ${name} WITHIN ${searchDistance} OF ${searchZip}`);
        const location = await convertZipToGeoCode(searchZip);
        const radius = miles_to_meters(searchDistance);
        console.log(`IN OTHER WORDS: ${partId} WITHIN ${radius} OF ${location}`);
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
