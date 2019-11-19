const router = require('express').Router();

const authRoutes = require('./authRoutes');
const searchRoutes = require('./searchRoutes');

// Every route inside of here
// has /api
router.use('/auth', authRoutes);
// router.use('/blogs', blogRoutes);
router.use('/search', searchRoutes);

module.exports = router;
