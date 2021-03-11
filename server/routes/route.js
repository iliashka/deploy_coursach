const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postsController = require('../controllers/postsController');
const ratingController = require('../controllers/ratingController');
const commentsController = require('../controllers/commentsController');
const tagsController = require('../controllers/tagsController');

require('events').EventEmitter.defaultMaxListeners = Infinity

router.post('/singup', userController.singup);

router.put('/uploadAvatar', userController.uploadAvatar)

router.post('/login', userController.login);

router.get('/user/:userId', userController.allowIfLoggedIn, userController.getUser);

router.get('/users', userController.allowIfLoggedIn, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('.user/:userId', userController.allowIfLoggedIn, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('.user/:userId', userController.allowIfLoggedIn, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);



router.post('/newPost', postsController.newPost)

router.post('/takeUserProfileInfo', postsController.takeProfileInfo)

router.put('/plusLike', postsController.plusLike)

router.put('/ratePost', ratingController.ratePost)

router.put('/deletePost', userController.allowIfLoggedIn, postsController.deletePost)

router.get('/posts', postsController.takePosts);

router.post('/post', postsController.getPost);

router.put('/editPost', postsController.editPost)

router.post('/getPostsByGenre', postsController.getPostsByGenre)

router.put('/addComment', commentsController.addComment)

router.put('/newTag', tagsController.newTag)

router.get('/tags', tagsController.tags)


module.exports = router;
