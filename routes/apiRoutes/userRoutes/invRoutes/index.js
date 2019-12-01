const router = require('express').Router();
const invController = require('../../../../controllers/invController');
const passportService = require('../../../../services/passport');
const passport = require('passport');
const authMiddlewares = require('../../../../middlewares/authMiddlewares');

router.route('/').get(authMiddlewares.requireAuth, invController.getParts);
router.route('/add/:partId').post(authMiddlewares.requireAuth, invController.addPart);
router.route('/sub/:partId').post(authMiddlewares.requireAuth, invController.subPart);
router.route('/:partId/qty').put(authMiddlewares.requireAuth, invController.setQty);
router.route('/:partId').delete(authMiddlewares.requireAuth, invController.deletePart);

module.exports = router;
