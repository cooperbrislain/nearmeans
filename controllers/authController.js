const db = require('./../models');
const jwt = require('jwt-simple');
const config = require('./../config/keys');

const tokenForUser = function(user) {
    const timeStamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);   
};

module.exports = {
    signUp: async (req, res) => {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(422).json({ error: "you must provide an email and a password"});
        }

        try {
            const existingUser = await db.User.findOne({ email });
            if(existingUser) {
                return res.status(422).json({ error: 'Email is in use' });
            }

            const user = new db.User({ email, password });
            await user.save();
            res.json({ token: tokenForUser(user) });
        } catch(e) {
            console.log(e);
            res.status(404).json({ e });
        }
    },
    signIn: (req, res) => {
        // res.send("Hooray!");    
        console.log(req.user);
        res.send({ token: tokenForUser(req.user) });
    }
}
