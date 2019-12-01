const db = require('./../models');
// const jwt = require('jwt-simple');
// const config = require('./../config/keys');

module.exports = {
    getThisUser: async (req, res) => {
        console.log(`GET THIS USER (${req.user.id})`);
        try {
            const user = await db.User.findOne({ _id: req.user._id }).populate('inventory','inventory.item');
            res.json(user);
        } catch (e) {
            res.json(e);
        }
    },
    getUserById: async (req, res) => {
        console.log(`GET USER ${req}`);
        try {
            const { userId } = req;
            const user = await db.User.findOne({ _id: userId }).populate('inventory','inventory.item');
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
        const { userData } = req.body;
        console.log(`UPDATE USER ${userId}`);
        console.log(req.body);
        try {
            const user = await db.User.findById(userId);
            console.log(user);
        } catch (e) {
            res.json(e);
        }
    }
};
