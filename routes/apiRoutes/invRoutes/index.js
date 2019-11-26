const router = require('express').Router();
const invController = require('./../../../controllers/invController');
const passportService = require('./../../../services/passport');
const passport = require('passport');
const authMiddlewares = require('./../../../middlewares/authMiddlewares');

router.route('/').get(authMiddlewares.requireAuth, invController.listParts);
router.route('/:partId/add').get(authMiddlewares.requireAuth, invController.addPart);
router.route('/:partId/sub').get(authMiddlewares.requireAuth, invController.subPart);
router.route('/:partId').put(authMiddlewares.requireAuth, invController.updatePart);
router.route('/:partId').delete(authMiddlewares.requireAuth, invController.deletePart);

module.exports = router;
