const router            = require('express').Router();
const userController    = require('./../../../controllers/userController');
const passportService   = require('./../../../services/passport');
const passport          = require('passport');
const authMiddlewares = require('./../../../middlewares/authMiddlewares');
const invRoutes = require('./invRoutes');

router.route('/all').get(userController.getAllUsers);
router.route('/').get(authMiddlewares.requireAuth, userController.getThisUser);
router.route('/:userId').get(userController.getUserById);
router.use('/:userId/inv', invRoutes);

module.exports = router;
