const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { roles } = require('../roles');
const Post = require('../models/postsModel');
const Like = require('../models/likesModel');

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

exports.takeProfileInfo = async (req, res, next) => {
    try {
        const { login } = req.body;
        const user = await User.findOne({login});
        const posts = await Post.find({login})
        res.status(200).json({
            data: {user, posts},
        })
    } catch (error) {
        next(error)
    }
}

exports.plusLike = async (req, res, next) => {
    console.log(req.body)
    try {
        const { postId, userId } = req.body;
        const user = await User.findById(userId);
        const isLike = await Like.findOne({postId, userId});
            if (!isLike) {
                const newLike = new Like({postId: postId, userId: userId});
                await newLike.save()
                const likes = await Like.find({postId})
                await Post.findByIdAndUpdate(postId, {likesCount: likes.length}, {new: true});
                const posts = await Post.find({})
                await res.json({
                    posts,
                    message: 'Вы поставили лайк'
                })
            } else {
                await Like.findByIdAndDelete(isLike._id)
                const likes = await Like.find({postId})
                await Post.findByIdAndUpdate(postId, {likesCount: likes.length}, {new: true});
                const posts = await Post.find({})
                await res.json({
                    posts,
                    message: 'Лайк удалён'
                })
            };
            
    } catch (error) {
        next(error)
    }
}

exports.getPostsByGenre = async (req, res, next) => {
    console.log(req.body)
    try {
        const { id, genre } = req.body;
        const user = await User.findById(id);
        const posts = await Post.find({login: user.login, genre: genre})
        await res.json({
            user,
            posts
        })
    } catch (error) {
        next(error)
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const { userId, postId } = req.body;
        const user = await User.findById(userId);
        await Post.findByIdAndDelete(postId);
        const posts = await Post.find({login: user.login})
        await res.json({
            user,
            posts
        })
    } catch (error) {
        next(error)
    }
}

exports.getPost = async (req, res, next) => {
    console.log(req.body)
    try {
        const { postId } = req.body;
        const post = await Post.findById(postId);
        await res.status(200).json({
            post
        })
    } catch (error) {
        next(error)
    }
}

