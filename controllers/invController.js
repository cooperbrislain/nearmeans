const db = require('./../models');

module.exports = {
    addPart: async (req, res) => {
        const { part } = req.body;
        try {
            const newPart = await new db.Part({ part });
            await newPart.save();
            const user = await db.User.findById(req.user._id);
            console.log(user);
            user.inventory.push(newPart);
            await user.save();
            res.json({ success: true });
        } catch(e) {
            res.json(e);
        }
    },
    listParts: async (req, res) => {
        try {
            const user = await db.User.findById(req.user._id);
            console.log(user.inventory);
            let parts = user.inventory;
            res.json(parts);
        } catch(e) {
            res.json(e);
        }
    }
    // router.route('/:partId').put(invController.updatePart),

    // router.route('/:partId/add').get(invController.addPart);
    // router.route('/:partId/sub').get(invController.subPart);
    // router.route('/:partId').put(invController.updatePart);
    // router.route('/:partId').delete(invController.deletePart);

    // module.exports = {
    //     getBlogs: async (req, res) => {
    //         try {
    //             const blogs = await db.Blog.find().populate('user', 'email');
    //             res.json(blogs);
    //         } catch(e) {
    //             res.json(e);
    //         }
    //     },
    //     getBlog: async (req, res) => {
    //         const { blogId } = req.params;
    //         try {
    //             const blog = await db.Blog.findById(blogId).populate('user', 'email');
    //             if(!blog){
    //                 res.status(404).json({ error: `No blog found`});
    //             }
    //             res.json(blog);
    //         } catch(e) {
    //             res.status(403).json(e);
    //         }
    //     },
    //     createBlog: async (req, res) => {
    //         const { content } = req.body;
    //         try {
    //             const newBlog = await new db.Blog({ user: req.user._id, content });
    //             await newBlog.save();
    //             const user = await db.User.findById(req.user._id);
    //             user.blogs.push(newBlog);
    //             await user.save();
    //             res.json({ success: true });
    //         } catch(e) {
    //             res.json(e);
    //         }
    //     },
    //     deleteBlog: async (req, res) => {
    //         const { blogId } = req.params;
    //         try {
    //             const blog = await db.Blog.findById(blogId);
    //             // console.log(blog.user);
    //             if(JSON.stringify(blog.user) !== JSON.stringify(req.user._id)) {
    //                 return res.status(401).json({ error: 'This is not your blog'});
    //             }
    //             await db.Blog.findByIdAndDelete(blogId);
    //             req.user.blogs.pull(blogId);
    //             await req.user.save();
    //             res.json({ success: true });
    //         } catch(e) {
    //             res.json(e);
    //         }
    //     }
    // };
};
