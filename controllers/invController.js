const db = require('./../models');

module.exports = {
    getParts: async (req, res) => {
        const userId = req.user._id;
        console.log(`SHOW INVENTORY FOR USER ${userId}`);
        try {
            const user = await db.User.findById(userId).populate('inventory.part');
            let inv = user.inventory;
            console.log(inv);
            res.json(inv);
        } catch (e) {
            res.json(e);
        }
    },
    addPart: async (req, res) => {
        const { partId } = req.params;
        const userId = req.user._id;
        console.log(`ADD PART ${partId} TO USER ${userId}`);
        try {
            const user = await db.User.findById(userId).populate('inventory.part'); 
            const invIndex = user.inventory.findIndex((invItem) => {
                return (invItem.part == partId);
            });
            console.log(invIndex);
            if (invIndex!=-1) {
                console.log('ITEM FOUND... INCREMENTING');
                user.inventory[invIndex].qty++;
            } else {
                console.log('ITEM NOT FOUND... ADDING');
                user.inventory.push({ part: partId , qty: 1 });
            }
            console.log('saving');
            await user.save();
            console.log('done');
            res.json({ success: true });
        } catch (e) {
            res.json(e);
        }
    },
    subPart: async (req, res) => {
        const { partId } = req.params;
        const userId = req.user._id;
        console.log(`SUBTRACT PART ${partId} FROM USER ${userId}`);
        try {
            const user = await db.User.findById(userId).populate('inventory.part'); 
            const invIndex = user.inventory.findIndex(invItem => {
                return (invItem.part == partId);
            });
            if (invIndex) {
                console.log('ITEM FOUND... DECREMENTING');
                user.inventory[invIndex].qty--;
                if (user.inventory[invIndex].qty <= 0) {
                    console.log('QUANTITY <= 0... REMOVING');
                    user.inventory.splice(invIndex,1);
                }
            } else {
                console.log('ITEM NOT FOUND');
            }
            console.log('saving');
            await user.save();
            console.log('done');
            res.json({ success: true });
        } catch (e) {
            res.json(e);
        }
    },
    deletePart: async (req, res) => {
        const { partId } = req.params;
        const userId = req.user._id;
        console.log(`DELETE PART ${partId} FROM USER ${userId}`);
        try {
            await db.User.update( 
                { _id: userId },
                { $pull: { inventory: { part : partId } } }
            );
            res.json();
        } catch (e) {
            res.json(e);
        }
    }
};
