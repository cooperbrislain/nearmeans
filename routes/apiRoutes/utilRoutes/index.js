const router = require('express').Router();
const utilController = require('./../../../controllers/utilController');

router.route('/autocomplete/part').get(utilController.autocompletePart);

module.exports = router;
