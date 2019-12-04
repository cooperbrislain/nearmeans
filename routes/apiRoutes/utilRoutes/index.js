const router = require('express').Router();
const utilController = require('./../../../controllers/utilController');

router.route('/complete/part').get(utilController.autocompletePart);

module.exports = router;
