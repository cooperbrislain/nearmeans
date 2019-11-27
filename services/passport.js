const passport      = require('passport');
const User          = require('./../models/User');
const config        = require('./../config/keys');
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const JwtStrategy   = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    console.log(email);
    console.log(password);
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return done(null, false);
        }
        await user.comparePassword(password, (err, isMatch) => {
            if(err) {
                return done(err);
            }
            if(!isMatch) {
                return done(null, false);
            }
            return done(null, user);
        });
    } catch(err) {
        done(err);
    }
});

const jwtOptions = {
    // Tells JwtStrategy that whenever a request comes in
    // and we want passport to handle it
    //  it needs to look from the header and more specifically from the property
    // called 'authorization'
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async(payload, done) => {
    // See if the user.id in the payload exists in our database
    try {
        const user = await User.findById(payload.sub);
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch(e) {
        done(e, false);
    }
});

passport.use(jwtLogin);
passport.use(localLogin);
