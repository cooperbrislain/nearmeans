const db = require('./../models');

module.exports = {
    createPart: async (req, res) => {
        const { partname, zipcode } = req.body;
        try {
            const parts = await db.Part.create({
                name: partname,
                zipcode: zipcode
            });
            res.json(parts);
        } catch (e) {
            res.json(e);
        }
    },
    getPart: async (req, res) => {
        const { partid } = req.body;
        try {
            // const parts = await db.Part.find({
            //     // name: partid
            // });
        } catch (e) {
            res.json(e);
        }
    },
    deletePart: async (req, res) => {
        const { partid } = req.body;
        try {
            // stuff
        } catch (e) {
            res.json(e);
        }
    }
};
