const passport      = require('passport');
const User          = require('./../models/User');
const config        = require('./../config/keys');
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const JwtStrategy   = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
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
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async(payload, done) => {
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
