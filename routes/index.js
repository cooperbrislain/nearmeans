const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const passportService   = require('./../services/passport');
const passport          = require('passport');

router.use('/api', apiRoutes);

module.exports = router;
