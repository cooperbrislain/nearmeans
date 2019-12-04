const db = require('./../models');

module.exports = {
    autocompletePart: async (req, res) => {
        const { q } = req.query;
        console.log(`AUTOCOMPLETE (${q})`);
        try {
            const results = await db.Part.find({ name: { $regex: `^${q}`, $options: 'i' } });
            await res.json(results);
        } catch (e) {
            await res.json(e);
        }
    }
};
