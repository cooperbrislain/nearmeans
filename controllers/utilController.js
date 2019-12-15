const db = require('./../models');
const config = require('./../config/keys');
const axios = require('axios');

module.exports = {
    autocompletePart: async (req, res) => {
        const { q } = req.query;
        try {
            const results = await db.Part.find({ name: { $regex: `${q}`, $options: 'i' } });
            await res.json(results);
        } catch (e) {
            await res.json(e);
        }
    },
    addrToGeo: async (req, res) => {
        const { q } = req.query;
        const req_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${q}&key=${config.google_api_key}`;
        console.log(req_url);
        try {
            const response = await axios.get(req_url);
            console.log(response.data);
            const { results } = response.data;
            const { location } = results[0].geometry;
            await res.json(location);
        } catch (e) {
            console.log(e);
        }
    },
    geoToAddr: async (req, res) => {
        const { lat, lng } = req.query;
        const req_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.google_api_key}`;
        try {
            const response = await axios.get(req_url);
            const { formatted_address } = response.data.results[0];
            await res.json(formatted_address);
        } catch (e) {
            console.log(e);
        }
    }
};
