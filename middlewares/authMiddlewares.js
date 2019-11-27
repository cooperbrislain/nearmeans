const passport = require('passport');

const requireAuth   = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = {
    requireAuth,
    requireSignIn
};
