const router            = require('express').Router();
const searchController    = require('./../../../controllers/searchController');

// /api/blogs
router.route('/')
    .post(searchController.findPart);

module.exports = router;
