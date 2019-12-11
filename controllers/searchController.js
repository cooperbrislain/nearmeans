const db = require('./../models');
const geolib = require('geolib');
const axios = require('axios');
const config = require('./../config/keys');

const miles_to_meters = x => x*1609.344;
const meters_to_miles = x => x/1609.344;

const convertZipToGeoCode = async (searchLocation) => {
    const req_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${config.google_api_key}`;
    try {
        const response = await axios.get(req_url);
        const { results } = response.data;
        const { location } = results[0].geometry;
        return location;
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
            await res.json({ invItems });
        } catch(e) {
            await res.json(e);
        }
    },
    findAll: async (req, res) => {
        try {
            const allParts = await db.Part.find();
            await res.json(allParts);
        } catch(e) {
            await res.json(e);
        }
    },
    findAllInRadius: async (req, res) => {
        let { partName, partId, searchZip, searchDistance } = req.body;
        console.log(`SEARCHING FOR PART NAMED ${partName} WITHIN ${searchDistance} MILES OF ${searchZip}`);
        const location = await convertZipToGeoCode(searchZip);
        const radius = miles_to_meters(searchDistance);
        if (partName) {
            try {
                const part = await db.Part.findOne({ "name" : { $regex: partName, $options: 'i' } });
                partId = part._id;
            } catch (e) {
                await res.json(e);
            }
        }
        console.log(`IN OTHER WORDS: ${partId} WITHIN ${radius} METERS OF (${location.lat},${location.lng})`);
        try {
            const invItems = await db.Inventory.find({ item: partId }).populate('item').populate('location');
            const foundItems = await invItems.filter(async invItem => {
                const distance = await geolib.getDistance(location, invItem.location.geo);
                return distance <= radius;
            });
            console.log(foundItems);
            await res.json({ searchResults: foundItems, center: location, radius });
        } catch (e) {
            console.log(e);
        }
    },
    findInRadiusOf: async (req, res) => {
        await res.json({success:true});
    }
};
