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
            console.log("I'm hit");
            return done(null, false);
        }
        user.comparePassword(password, (err, isMatch) => {

            if(err) {
                console.log("I'm hit in err");
                return done(err);
            }
            if(!isMatch) {                
                console.log("I'm hit in match");
                return done(null, false);
            }
            return done(null, user);
        });
    } catch(err) {
        done(err);
    }
});


// Setup options for JWT Strategy
// We need to tell JWT Strategy where to look for the token
const jwtOptions = {
    // Tells JwtStrategy that whenever a request comes in
    // and we want passport to handle it
    //  it needs to look from the header and more specifically from the property
    // called 'authorization'
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// We are going to get the payload argument from a request
//  the payload argument is coming from the function we created in the authRoutes
// done is the function we call once we've tried to authenticate this user
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
