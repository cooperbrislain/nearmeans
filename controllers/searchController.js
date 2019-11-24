const db = require('./../models');

module.exports = {
    findPart: async (req, res) => {
        const { partname, zipcode } = req.body;
        console.log(partname);
        try {
            const parts = await db.Part.find({
                name: partname,
                zipcode: zipcode
            });
            console.log(parts);
            res.json(parts);
        } catch(e) {
            res.json(e);
        }
    }
};
