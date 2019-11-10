const router = require('express').Router();

const authRoutes = require('./authRoutes');
const blogRoutes = require('./blogRoutes');

// Every route inside of here
// has /api
router.use('/auth', authRoutes);
router.use('/blogs', blogRoutes);


module.exports = router;