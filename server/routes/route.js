const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postsController = require('../controllers/postsController');
require('events').EventEmitter.defaultMaxListeners = Infinity

router.post('/singup', userController.singup);

router.post('/login', userController.login);

router.get('/user/:userId', userController.allowIfLoggedIn, userController.getUser);

router.get('/users', userController.allowIfLoggedIn, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('.user/:userId', userController.allowIfLoggedIn, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('.user/:userId', userController.allowIfLoggedIn, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);



router.post('/newPost', postsController.newPost)

router.post('/takeUserProfileInfo', postsController.takeProfileInfo)

router.put('/plusLike', postsController.plusLike)

router.get('/posts', postsController.takePosts);

router.post('/getPostsByGenre', postsController.getPostsByGenre)


module.exports = router;