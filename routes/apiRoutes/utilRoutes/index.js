const router = require('express').Router();
const utilController = require('./../../../controllers/utilController');

console.log('SEED_DB_PATH', process.env.SEED_DB_PATH);

router.route('/autocomplete/part').get(utilController.autocompletePart);
router.route('/geo').get(utilController.addrToGeo);
router.route('/oeg').get(utilController.geoToAddr);
router.route(`/seed/${ process.env.SEED_DB_PATH }`).get(utilController.seedDb);

module.exports = router;
