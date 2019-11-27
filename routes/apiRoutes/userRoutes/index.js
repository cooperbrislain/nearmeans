const router            = require('express').Router();
const userController    = require('./../../../controllers/userController');
const passportService   = require('./../../../services/passport');
const passport          = require('passport');
const authMiddlewares = require('./../../../middlewares/authMiddlewares');

module.exports = router;
