const router            = require('express').Router();
const searchController    = require('./../../../controllers/searchController');

router.route('/').post(searchController.findPart);
router.route('/all').get(searchController.findAll);
router.route('/nearby').post(searchController.findAllInRadius);
router.route('/:partId/within/:searchDistance/of/:searchLocation').get(searchController.findInRadiusOf);

module.exports = router;
