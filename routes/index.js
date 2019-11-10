const router = require('express').Router();

const apiRoutes = require('./apiRoutes');

// prepend /api into any routes declared in apiRoutes
router.use('/api', apiRoutes);

module.exports = router;