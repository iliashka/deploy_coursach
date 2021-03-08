const User = require('./../models/userModel');
const Post = require('../models/postsModel');
const Like = require('../models/likesModel');
const Rate = require('../models/rateModel');
const Comments = require('../models/commentsModel'); 

exports.addComment = async (req, res, next) => {
    try {
        const { userLogin, postId, comment } = req.body;
        const newComment = await new Comments({userLogin: userLogin, postId: postId, comment: comment});
        newComment.save();
        const post = await Post.findById(postId);
        await post.comments.push(newComment)
        await post.save();
        const posts = await Post.find({});
        res.status(200).json({
            posts, message: 'коммент добавлен'
        })
    } catch (error) {
        next(error)
    }
}