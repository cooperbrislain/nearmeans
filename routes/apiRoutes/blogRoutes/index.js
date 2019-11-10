const router            = require('express').Router();
const blogController    = require('./../../../controllers/blogController');
const passportService   = require('./../../../services/passport');
const passport          = require('passport');

// api/blogs prepended to every route declared in here

const authMiddlewares = require('./../../../middlewares/authMiddlewares');


// /api/blogs
router.route('/')
    .get(blogController.getBlogs)
    .post(authMiddlewares.requireAuth, blogController.createBlog)


// /api/blogs/:blogId
router.route('/:blogId')
    .get(blogController.getBlog)
    .delete(authMiddlewares.requireAuth, blogController.deleteBlog);






module.exports = router;