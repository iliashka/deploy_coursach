const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { roles } = require("../roles");
const Post = require("../models/postsModel");
const Like = require("../models/likesModel");
const Tags = require("../models/tagsModel");
const algoliasearch = require("algoliasearch")

const client = algoliasearch("N815CNHWDN", "a27316884c56adae6fffbe1090805388");
const index = client.initIndex("posts2");

exports.createIndex = async (req, res, next) => {
    try {
        const object = req.post;
        console.log(object);
        index
          .saveObject(object, { autoGenerateObjectIDIfNotExist: true })
          .then(() => {
              res.status(200).json({msg: "good"});
          }) 
          .catch((err) => console.log(err));      
    } catch (error) {
        next(error);
    }
}

exports.takePosts = async (req, res, next) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({
            posts
        });
    } catch (error) {
        next(error);
    }
};

exports.newPost = async (req, res, next) => {
    try {
        const { login, post, postName, genre, summary, tags } = req.body;
        console.log(tags)
        const newPost = await new Post({ login, post, postName, genre, likesCount: 0, summary, tags});
        await newPost.save();        
            await tags.map(async (e, index) => {
                const question = await Tags.findOne({tagBody: e});
                if (!question) {
                    const tag = new Tags({tagBody: e})
                    tag.save()
                }else{
                    return;
                }
            });
         req.post = newPost;
        next()
    } catch (error) {
        next(error)
    }
}

exports.search = async (req, res, next) => {
    try {
       const {text} = req.body
       if(text.length >= 1) {
        await index
        .search(text) 
        .then(({hits}) => {
        const arr = hits.map((e, i) => {
            return e
        }) 
        console.log(arr)
        res.status(200).json(arr)
    })}
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
    try {
        const { postId, userId } = req.body;
        const user = await User.findById(userId);
        const isLike = await Like.findOne({postId, userId});
            if (!isLike) {
                const newLike = new Like({postId: postId, userId: userId});
                await newLike.save();
                const likes = await Like.find({postId});
                await Post.findByIdAndUpdate(postId, {likesCount: likes.length}, {new: true});
                const posts = await Post.find({});
                await res.json({
                    posts,
                    message: "Вы поставили лайк",
                });
            } else {
                await Like.findByIdAndDelete(isLike._id);
                const likes = await Like.find({postId});
                await Post.findByIdAndUpdate(postId, {likesCount: likes.length}, {new: true});
                const posts = await Post.find({});
                await res.json({
                    posts,
                    message: "Лайк удалён",
                });
            }
            
    } catch (error) {
        next(error);
    }
};

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
        const { deletedId, postId } = req.body;
        const user = await User.findById(deletedId);
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

exports.editPost = async (req, res, next) => {
    console.log(req.body)
    try {
        const { id, update } = req.body;
        console.log(update)
        await Post.findByIdAndUpdate(id, update, {new: true});
        await res.status(200).json({
            message: "Пост Изменён"
        })
    } catch (error) {
        next(error)
    }
}

exports.searchByGenre = async (req, res, next) => {
    try {
        const { genre } = req.body;
        const posts = await Post.find({genre: genre})
        res.status(200).json({
            posts
        })
    } catch (error) {
        next(error)
    }
}