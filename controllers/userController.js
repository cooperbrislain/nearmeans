const db = require('./../models');

module.exports = {
    getThisUser: async (req, res) => {
        console.log(`GET THIS USER (${req.user.id})`);
        try {
            const user = await db.User.findOne({ _id: req.user._id }).populate(['inventory','inventory.item']);
            res.json(user);
        } catch (e) {
            res.json(e);
        }
    },
    getUserById: async (req, res) => {
        const { userId } = req.params;
        console.log(`GET USER ${userId}`);
        try {
            const user = await db.User.findOne({ _id: userId }).populate(['inventory','inventory.item']);
            res.json(user);
        } catch (e) {
            res.json(e);
        }
    },
    getUserByEmail: async (req, res) => {
        console.log(`GET USER ${req}`);
        try {
            const { email } = req;
            const user = await db.User.findOne({ email });
            res.json(user);
        } catch (e) {
            res.json(e);
        }
    },
    getAllUsers: async (req, res) => {
        console.log('GET ALL USERS');
        try {
            const users = await db.User.find();
            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },
    updateUser: async (req, res) => {
        const { userId } = req.params;
        const userData = JSON.parse(req.body.userData);
        console.log(`UPDATE USER ${userId}`);
        try {
            let user = await db.User.findById(userId);
            Object.assign(user, userData);
            user.save();
            res.json('success');
        } catch (e) {
            res.json(e);
        }
    }
};
