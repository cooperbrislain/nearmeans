const router            = require('express').Router();
const partController    = require('./../../../controllers/partController');

router.route('/').post(partController.createPart);
router.route('/:partId').get(partController.getPart);
router.route('/:partId').delete(partController.deletePart);

module.exports = router;
