const router            = require('express').Router();
const partController    = require('./../../../controllers/partController');

// /api/blogs
router.route('/')
    .put(partController.createPart);

module.exports = router;
