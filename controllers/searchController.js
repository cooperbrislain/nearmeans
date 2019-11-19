const db = require('./../models');

module.exports = {
    findPart: async (req, res) => {
        console.log(req.body);
        const { partname, zipcode } = req.body;
        try {
            const parts = await db.Part.find({
                name: partname,
                zipcode: zipcode
            });
            // const parts = await db.Part.create({
            //     name: partname,
            //     zipcode: zipcode
            // });
            console.log(parts);
            res.json(parts);
        } catch(e) {
            res.json(e);
        }
    }
};
