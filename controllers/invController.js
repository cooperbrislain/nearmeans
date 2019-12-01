const db = require('./../models');

module.exports = {
    getParts: async (req, res) => {
        const userId = req.user._id;
        console.log(`SHOW INVENTORY FOR USER ${userId}`);
        try {
            const user = await db.User.findById(userId)
                .populate({ 
                    path: 'inventory',
                    select: ['item','qty','location'],
                    populate: {
                        path: 'item'
                    }
                });
            let inv = user.inventory;
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
            const user = await db.User.findById(userId)
                .populate({ 
                    path: 'inventory',
                    populate: {
                        path: 'item'
                    }
                }); 
            const invIndex = user.inventory.findIndex((invItem) => {
                return (invItem.item._id == partId);
            });
            if (invIndex!==-1) {
                console.log('ITEM FOUND... INCREMENTING');
                user.inventory[invIndex].qty++;
                user.inventory[invIndex].save();
            } else {
                console.log('ITEM NOT FOUND... ADDING');
                console.log(`USING USER LOCATION: ${user.location}`);
                const invItem = await new db.Inventory({ 
                    userId,
                    item: partId,
                    qty: 1,
                    location: user.location
                });
                invItem.save();
                user.inventory.push(invItem);
            }
            await user.save();
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
            const user = await db.User.findById(userId)
                .populate({ 
                    path: 'inventory',
                    populate: {
                        path: 'item'
                    }
                });
            const invIndex = user.inventory.findIndex(invItem => {
                console.log(invItem);
                return (invItem.item._id == partId);
            });
            if (invIndex!==-1) {
                console.log('ITEM FOUND... DECREMENTING');
                user.inventory[invIndex].qty--;
                if (user.inventory[invIndex].qty <= 0) {
                    console.log('QUANTITY <= 0... REMOVING');
                    user.inventory.splice(invIndex,1);
                }
            } else {
                console.log('ITEM NOT FOUND');
            }
            await user.save();
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
                { $pull: { inventory: { item : partId } } }
            );
            res.json();
        } catch (e) {
            res.json(e);
        }
    }
};
