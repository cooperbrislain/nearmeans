const db = require('./../models');

module.exports = {
    createPart: async (req, res) => {
        const { partname, zipcode } = req.body;
        try {
            await db.Part.insertOne({
                name: partname,
                zipcode: zipcode
            });
        } catch (e) {
            res.json(e);
        }
    },
    getPart: async (req, res) => {
        const { partid } = req.body;
        try {
            const part = await db.Part.findById(partid);
            res.json(part);
        } catch (e) {
            res.json(e);
        }
    },
    // update
    deletePart: async (req, res) => {
        const { partid } = req.body;
        try {
            await db.Part.findByIdAndDelete(partid);
        } catch (e) {
            res.json(e);
        }
    }
};
