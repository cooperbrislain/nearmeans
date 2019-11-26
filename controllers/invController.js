const db = require('./../models');

module.exports = {
    addPart: async (req, res) => {
        const { part } = req.body;
        const { qty } = req.params;
        console.log(part);
        console.log(qty);
        try {
            let result = await db.Inventory.findOne({ partId: part });
            if (result) {
                console.log(result);
            } else {
                console.log('not found');
            }
            res.json(result);
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    }
};
