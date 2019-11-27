const router            = require('express').Router();
const userController    = require('./../../../controllers/userController');
const passportService   = require('./../../../services/passport');
const passport          = require('passport');
const authMiddlewares = require('./../../../middlewares/authMiddlewares');

router.route('/all').get(userController.getAllUsers);
router.route('/').get(authMiddlewares.requireAuth, userController.getThisUser);
router.route('/:userId').get(userController.getUserById);

module.exports = router;
