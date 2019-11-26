const router            = require('express').Router();
const invController    = require('./../../../controllers/invController');

router.route('/').get(invController.listParts);
router.route('/:partId/add').get(invController.addPart);
router.route('/:partId/sub').get(invController.subPart);
router.route('/:partId').put(invController.updatePart);
router.route('/:partId').delete(invController.deletePart);

module.exports = router;
