const db = require('./../models');

module.exports = {
    autocompletePart: async (req, res) => {
        const { q } = req.query;
        try {
            const results = await db.Part.find({ name: { $regex: `^${q}`, $options: 'i' } });
            await res.json(results);
        } catch (e) {
            await res.json(e);
        }
    }
};
