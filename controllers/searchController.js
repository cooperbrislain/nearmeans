const db = require('./../models');
const geolib = require('geolib');
const axios = require('axios');
const config = require('./../config/keys');

const miles_to_meters = x => x*1609.344;
const meters_to_miles = x => x/1609.344;

const convertZipToGeoCode = async (zipCode) => {
    const req_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${config.google_api_key}`;
    console.log(req_url);
    try {
        const response = await axios.get(req_url);
        const { results } = response.data;
        const geoCode = results[0].geometry.location;
        return geoCode;
    } catch (e) {
        console.log(e);
    }
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
        let { partName, partId, searchZip, searchDistance } = req.body;
        console.log(`SEARCHING FOR PART NAMED ${partName} WITHIN ${searchDistance} OF ${searchZip}`);
        const location = await convertZipToGeoCode(searchZip);
        const radius = miles_to_meters(searchDistance);
        if (partName) {
            try {
                const part = await db.Part.findOne({ name: partName });
                partId = part._id;
            } catch (e) {
                res.json(e);
            }
        }
        console.log(`IN OTHER WORDS: ${partId} WITHIN ${radius} OF ${location}`);
        try {
            const invItems = await db.Inventory.find().populate('item');
            const foundItems = invItems.filter((invItem) => {
                if (invItem.item._id !== partId);
                if (geolib.getDistance(location, invItem.location) > radius) return 0;
                return 1;
            });
            res.json(foundItems);
        } catch (e) {
            res.json(e);
        }
    },

    findInRadiusOf: async (req, res) => {
        res.json({success:true});
    }
};
