const router = require('express').Router();
const authRoutes = require('./authRoutes');
const searchRoutes = require('./searchRoutes');
const partRoutes = require('./partRoutes');
const userRoutes = require('./userRoutes');
const utilRoutes = require('./utilRoutes');

router.use('/auth', authRoutes);
router.use('/search', searchRoutes);
router.use('/part', partRoutes);
router.use('/user', userRoutes);
router.use('/util', utilRoutes);

module.exports = router;
