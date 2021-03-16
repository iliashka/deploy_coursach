const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postsController = require('../controllers/postsController');
const ratingController = require('../controllers/ratingController');
const commentsController = require('../controllers/commentsController');
const tagsController = require('../controllers/tagsController');

require('events').EventEmitter.defaultMaxListeners = Infinity

router.post('/api/singup', userController.singup);

router.put('/api/uploadAvatar', userController.uploadAvatar)

router.post('/api/login', userController.login);

router.get('/api/user/:userId', userController.allowIfLoggedIn, userController.getUser);

router.post('/api/users', userController.allowIfLoggedIn, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('/api/updateUser', userController.allowIfLoggedIn, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.put('/api/deleteUser', userController.allowIfLoggedIn, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);



router.post('/api/newPost', postsController.newPost, postsController.createIndex)

router.post('/api/takeUserProfileInfo', postsController.takeProfileInfo)

router.put('/api/plusLike', postsController.plusLike)

router.put('/api/ratePost', ratingController.ratePost)

router.put('/api/deletePost', userController.allowIfLoggedIn, postsController.deletePost)

router.get('/api/posts', postsController.takePosts);

router.post('/api/post', postsController.getPost);

router.put('/api/editPost', postsController.editPost)

router.post('/api/getPostsByGenre', postsController.getPostsByGenre)

router.put('/api/addComment', commentsController.addComment)

router.put('/api/newTag', tagsController.newTag)

router.get('/api/tags', tagsController.tags)

router.post('/api/search', postsController.search)


module.exports = router;
