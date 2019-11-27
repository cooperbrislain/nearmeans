const router            = require('express').Router();
const authController    = require('./../../../controllers/authController');
const passportService   = require('./../../../services/passport');
const passport          = require('passport');
const authMiddlewares = require('./../../../middlewares/authMiddlewares');

router.route('/signup').post(authController.signUp);
router.route('/signin').post(authMiddlewares.requireSignIn, authController.signIn);
router.route('/signout').get(authMiddlewares.requireSignIn, authController.signOut);

module.exports = router;
