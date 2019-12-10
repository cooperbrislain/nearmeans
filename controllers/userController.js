const db = require('./../models');

module.exports = {
    getThisUser: async (req, res) => {
        console.log('GET THIS USER');
        try {
            const user = await db.User.findOne({ _id: req.user._id }).populate(['inventory','inventory.item']);
            await res.json(user);
        } catch (e) {
            await res.json(e);
        }
    },
    getUserById: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await db.User.findOne({ _id: userId }).populate(['inventory','inventory.item']);
            await res.json(user);
        } catch (e) {
            await res.json(e);
        }
    },
    getUserByEmail: async (req, res) => {
        try {
            const { email } = req.query;
            const user = await db.User.findOne({ email });
            await res.json(user);
        } catch (e) {
            await res.json(e);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await db.User.find();
            await res.json(users);
        } catch (e) {
            await res.json(e);
        }
    },
    updateUser: async (req, res) => {
        const { userId } = req.params;
        const userData = JSON.parse(req.body.userData);
        try {
            let user = await db.User.findById(userId);
            Object.assign(user, userData);
            user.save();
            await res.json({success:true});
        } catch (e) {
            await res.json(e);
        }
    },
    deleteUser: async (req, res) => {
        const { userId } = req.params;
        try {
            await db.User.findByIdAndDelete(userId);
        } catch (e) {
            await res.json(e);
        }
    }
};
