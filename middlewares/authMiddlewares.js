const passport = require('passport');

// By default passport wants to make use of cookie based authentication by default
// In our case, we are using tokens. So we need to override this behavior

const requireAuth   = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = {
    requireAuth,
    requireSignIn
};

