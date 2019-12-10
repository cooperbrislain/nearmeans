const db = require('./../models');
const config = require('./../config/keys');
const axios = require('axios');

module.exports = {
    autocompletePart: async (req, res) => {
        const { q } = req.query;
        try {
            const results = await db.Part.find({ name: { $regex: `^${q}`, $options: 'i' } });
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
            return location;
        } catch (e) {
            console.log(e);
        }
    }
};
