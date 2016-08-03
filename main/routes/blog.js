var express = require('express'),
    router = express.Router(),
    blogController = require('../controllers/blog_controller'),
    postController = require('../controllers/post_controller'),
    auth = require('../auth/authenticate');

//list
router.get('/', auth.isAuthenticated, blogController.list, blogController.render);

//detail
router.get('/:userId/:blogname', blogController.detail, blogController.render);

//create
router.get('/create', auth.isAuthenticated, blogController.create, blogController.render);
router.post('/create', auth.isAuthenticated, blogController.create, blogController.render);

//modify
router.get('/:userId/:blogname/modify', auth.isAuthenticated, blogController.modify, blogController.render);
router.post('/:userId/:blogname/modify', auth.isAuthenticated, blogController.modify, blogController.render);

//remove
router.post('/:userId/:blogname/remove', auth.isAuthenticated, blogController.remove);

//category
router.post('/:userId/:blogname/createcategory', auth.isAuthenticated, blogController.createCategory);
router.post('/:userId/:blogname/removecategory', auth.isAuthenticated, blogController.removeCategory);

//post
router.get('/:userId/:blogname/createpost', auth.isAuthenticated, auth.isOwned, postController.create, postController.render);
router.post('/:userId/:blogname/createpost', auth.isAuthenticated, auth.isOwned, postController.create);
router.get('/:userId/:blogname/:category', postController.list, postController.render);
//router.post('/:userId/:blogname/removecategory', auth.isAuthenticated, controller.removeCategory);

module.exports = router;
