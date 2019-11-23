const router = require('express').Router();
const authRoutes = require('./authRoutes');
const searchRoutes = require('./searchRoutes');
const partRoutes = require('./partRoutes');

// Every route inside of here
// has /api
router.use('/auth', authRoutes);
router.use('/search', searchRoutes);
router.use('/part', partRoutes);

module.exports = router;
