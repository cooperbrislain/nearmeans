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
            await res.json(inv);
        } catch (e) {
            await res.json(e);
        }
    },
    addPart: async (req, res) => {
        const { partId } = req.params;
        const userId = req.user._id;
        try {
            const user = await db.User.findById(userId)
                .populate({ 
                    path: 'inventory',
                    populate: {
                        path: 'item'
                    }
                }); 
            const invIndex = user.inventory.findIndex(invItem => invItem.item._id === partId);
            if (invIndex!==-1) {
                user.inventory[invIndex].qty++;
                user.inventory[invIndex].save();
            } else {
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
            await res.json({ success: true });
        } catch (e) {
            await res.json(e);
        }
    },
    subPart: async (req, res) => {
        const { partId } = req.params;
        const userId = req.user._id;
        try {
            const user = await db.User.findById(userId)
                .populate({ 
                    path: 'inventory',
                    populate: {
                        path: 'item'
                    }
                });
            const invIndex = user.inventory.findIndex(invItem => invItem.item._id === partId);
            if (invIndex!==-1) {
                user.inventory[invIndex].qty--;
                user.inventory[invIndex].save();
                if (user.inventory[invIndex].qty <= 0) {
                    user.inventory.splice(invIndex,1);
                }
            } else {
                console.log('ITEM NOT FOUND');
            }
            await user.save();
            await res.json({success:true});
        } catch (e) {
            await res.json(e);
        }
    },
    updateInvItem: async (req, res) => {
        const { invId } = req.params;
        const userId = req.user._id;
        const { invData } = req.body;
        console.log(`UPDATE INVENTORY ${invId} FROM USER ${userId}`);
        try {
            const result = await db.Inventory.findByIdAndUpdate(invId, invData);
            await res.json(result);
        } catch (e) {
            await res.json(e);
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
            await res.json({success:true});
        } catch (e) {
            await res.json(e);
        }
    },
    transferPart: async (req, res) => {
        const { userFrom, userTo, invtId, qty } = req.params;
        console.log(`TRANSFERRING PART ${invId} FROM ${userFrom} TO ${userTo}`);
        try {
            // await db.User...
            // decrement from user inventory
            // increment to user inventory
            await res.json({success:true});
        } catch (e) {
            await res.json(e);
        }
    }
};
