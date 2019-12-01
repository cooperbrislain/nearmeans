const router            = require('express').Router();
const searchController    = require('./../../../controllers/searchController');

router.route('/').post(searchController.findPart);
router.route('/all').get(searchController.findAll);
router.route('/nearby').get(searchController.findAllInRadius);

module.exports = router;
