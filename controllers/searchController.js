const db = require('./../models');

module.exports = {
    findPart: async (req, res) => {
        const { partname, zipcode } = req.body;
        try {
            const parts = await db.Part.find({
                name: partname,
                zipcode: zipcode
            });
            res.json(parts);
        } catch(e) {
            res.json(e);
        }
    }
};
