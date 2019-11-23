const router            = require('express').Router();
const partController    = require('./../../../controllers/partController');

router.route('/').post(partController.createPart);
router.route('/:partid').get(partController.getPart);
router.route('/:partid').delete(partController.deletePart);

module.exports = router;
