const router = require('express').Router();
const utilController = require('./../../../controllers/utilController');

router.route('/autocomplete/part').get(utilController.autocompletePart);
router.route('/geo').get(utilController.addrToGeo);
router.route('/oeg').get(utilController.geoToAddr);
module.exports = router;
