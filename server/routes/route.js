const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/singup', userController.singup);

router.post('/login', userController.login);

router.post('/newPost', userController.newPost)

router.get('/user/:userId', userController.allowIfLoggedIn, userController.getUser);

router.get('/users', userController.allowIfLoggedIn, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.get('/posts', userController.takePosts);

router.put('.user/:userId', userController.allowIfLoggedIn, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('.user/:userId', userController.allowIfLoggedIn, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

module.exports = router;