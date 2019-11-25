const db = require('./../models');

module.exports = {
    findPart: async (req, res) => {
        const { partName } = req.body;
        try {
            const parts = await db.Part.find({
                name: partName
            });
            console.log('got response');
            console.log(parts);
            res.json(parts);
        } catch(e) {
            res.json(e);
        }
    },

    findAll: async (req, res) => {
        try {
            console.log('getting all parts');
            const allParts = await db.Part.find();
            console.log(allParts);
            res.json(allParts);
        } catch(e) {
            res.json(e);
        }
    }
};
