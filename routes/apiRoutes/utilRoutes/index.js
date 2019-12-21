const router = require('express').Router();
const utilController = require('./../../../controllers/utilController');

router.route('/autocomplete/part').get(utilController.autocompletePart);
router.route('/geo').get(utilController.addrToGeo);
router.route('/oeg').get(utilController.geoToAddr);
router.route(`/seed/${ process.env.SEEDPATH }`).get(utilController.seedDb);

module.exports = router;
