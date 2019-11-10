const router            = require('express').Router();
const authController    = require('./../../../controllers/authController');
const passportService   = require('./../../../services/passport');
const passport          = require('passport');
// api/auth prepended to every route declared in here

const authMiddlewares = require('./../../../middlewares/authMiddlewares');

router.route('/signup')
    .post(authController.signUp);


router.route('/signin')
    .post(authMiddlewares.requireSignIn, authController.signIn);


// router.route('/logout')
//     .get(authController.logout);

module.exports = router;