const router = require('express').Router();
const authRoutes = require('./authRoutes');
const searchRoutes = require('./searchRoutes');
const partRoutes = require('./partRoutes');
const userRoutes = require('./userRoutes');

router.use('/auth', authRoutes);
router.use('/search', searchRoutes);
router.use('/part', partRoutes);
router.use('/user', userRoutes);

module.exports = router;
