const router = require('express').Router();
const invController = require('../../../../controllers/invController');
const authMiddlewares = require('../../../../middlewares/authMiddlewares');

router.route('/').get(authMiddlewares.requireAuth, invController.getParts);
// router.route('/add/:partId').post(authMiddlewares.requireAuth, invController.addPart);
// router.route('/sub/:partId').post(authMiddlewares.requireAuth, invController.subPart);
router.route('/:invId').put(authMiddlewares.requireAuth, invController.updateInvItem);
// router.route('/:partId').delete(authMiddlewares.requireAuth, invController.deletePart);
router.route('/add').post(authMiddlewares.requireAuth, invController.addEmptyPart);

module.exports = router;
