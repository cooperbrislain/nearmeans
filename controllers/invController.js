const db = require('./../models');

const convertZipToGeoCode = async (searchLocation) => {
    const req_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${config.google_api_key}`;
    try {
        const response = await axios.get(req_url);
        const { results } = response.data;
        const { location } = results[0].geometry;
        return location;
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getParts: async (req, res) => {
        console.log('GET PARTS');
        const userId = req.user._id;
        try {
            const { inventory } = await db.User.findById(userId)
                .populate({ 
                    path: 'inventory',
                    model: db.Inventory,
                    populate: [{ path: 'item' }, { path: 'location'}]
                });
            await res.json(inventory);
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
                    model: db.Inventory,
                    populate: {
                        path: [{ path: 'item' }, { path: 'location' }]
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
        const invData = req.body;
        try {
            console.log(invData);
            if (invData.location) invData.location = await convertZipToGeoCode(invData.location);
            console.log(invData);
            const result = await db.Inventory.findByIdAndUpdate(invId, invData);
            await res.json(result);
        } catch (e) {
            await res.json(e);
        }
    },
    deletePart: async (req, res) => {
        const { partId } = req.params;
        const userId = req.user._id;
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
        try {
            // await db.User...
            // decrement from user inventory
            // increment to user inventory
            await res.json({success:true});
        } catch (e) {
            await res.json(e);
        }
    },
    addNewOrExistingPart: async (req, res) => {
        const { partName, qty } = req.params;
        const { user } = req;
        const userId = user._id;
        try {
            let part = await db.Part.find({name: partName});
            if (!part) {
                part = await new db.Part({
                    name: partName
                });
                await part.save();
                const invItem = await new db.Inventory({
                    userId,
                    item: part._id,
                    qty,
                    location: user.location
                });
                await invItem.save();
                user.inventory.push(invItem);
            }
            await user.save();
            await res.json({success: true});
        } catch (e) {
            await res.json(e);
        }
    },
    addEmptyPart: async (req, res) => {
        const { user } = req;
        const userId = user._id;
        try {
            const invItem = await new db.Inventory({
                userId,
                qty: 0,
                location: user.location
            });
            await invItem.save();
            user.inventory.push(invItem);
            await user.save();
            await res.json({success: true});
        } catch (e) {
            await res.json(e);
        }
    }
};
