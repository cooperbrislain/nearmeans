const db = require('./../models');

module.exports = {
    autocompletePart: async (req, res) => {
        console.log(`AUTOCOMPLETE (${req.string})`);
        try {
            const results = await db.Part.findOne({ name: req.string});
            await res.json(results);
        } catch (e) {
            await res.json(e);
        }
    }
};
