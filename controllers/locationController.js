const db = require('./../models');
const axios = require('axios');

module.exports = {
    createLocation: async (req, res) => {
        const { coords, address, zipcode } = req.body;
        const locationData = {};
        if (coords) {
            locationData.geo = coords;
        }
        if (address) {
            locationData.address = address;
        }
        if (zipcode) {
            locationData.address.zip = zipcode;
        }
        const lookupData = await axios.post('url');
        const mergedData = Object.assign(locationData, lookupData);
        try {
            const newLocation = new db.Location(mergedData);
            await newLocation.save();
            await res.json(newLocation);
        } catch (e) {
            await res.json(e);
        }
    },
    getLocation: async (req, res) => {
        try {
            const { locationId }= req;
            const location = db.Location.findById(locationId);
            await res.json(location);
        } catch (e) {
            await res.json(e);
        }
    },
    updateLocation: async (req, res) => {
        const { locationId, locationData } = req.params;
        try {
            await db.Location.findByIdAndUpdate(locationId, locationData);
            await res.json({success:true});
        } catch (e) {
            await res.json(e);
        }
    },
    deleteLocation: async (req, res) => {
        const { locationId } = req.params;
        try {
            await db.Location.findByIdAndDelete(locationId);
            await res.json({success:true});
        } catch (e) {
            await res.json(e);
        }
    }
};
