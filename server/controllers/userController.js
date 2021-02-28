const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { roles } = require('../roles');
const Post = require('../models/postsModel');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

exports.singup = async (req, res, next) => {
    try {
        const { login, email, password, role } = req.body
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ login, email, password: hashedPassword, role: role || 'user' })
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        newUser.accessToken = accessToken;
        await newUser.save();
        res.json({
            data: newUser,
            message: 'Вы успешно зарегистрированы'
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return next(new Error('Электронная почта не существует!'));
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error('Неверный пароль!'));
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        await User.findByIdAndUpdate(user._id, { accessToken })
        res.status(200).json({
            data: { email: user.email, role: user.role, login: user.login },
            accessToken,
            message: 'Вы вошли в систему'
        })
    } catch (error) {
        next(error)
    }
}

exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        data: users
    })
}

exports.getUser = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) return next(new Error('Нет такого пользователя!'));
        res.status(200).json({
            data: user
        })
    } catch (error) {
        next(error)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
      const update = req.body;
      const userId = req.params.userId;
      await User.findByIdAndUpdate(userId, update);
      const user = await User.findById(userId)
      res.status(200).json({
          data: user,
          message: 'Пользователь был обновлён'
      })
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
       const userId = req.params.userId;
       await User.findByIdAndDelete(userId);
       res.status(200).json({
           data: null,
           message: 'Пользователь был удалён'
       });
    } catch (error) {
        next(error)
    }
}

exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: 'У вас нет разрешения для совершения этого действия'
                })
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

exports.allowIfLoggedIn = async (req, res, next) => {
    try {
        const user = res.locals.loggedInUser;
        if (!user)
            return res.status(401).json({
                error: 'Вы должны войти в систему, чтобы получить доступ к этому маршруту'
            })
            req.user = user;
            next()
    } catch (error) {
        next(error)
    }
}

exports.takePosts = async (req, res, next) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({
            posts
        })
    } catch (error) {
        next(error)
    }
}

exports.newPost = async (req, res, next) => {
    try {
        const { login, post, postName, genre, summary } = req.body;
        const newPost = new Post({ login, post, postName, genre, likesCount: 0, summary });
        await newPost.save();
        res.json({
            data: newPost,
            message: 'Пост успешно добавлен'
        })
    } catch (error) {
        next(error)
    }
}