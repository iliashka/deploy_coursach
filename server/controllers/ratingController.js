const User = require("./../models/userModel");
const Post = require("../models/postsModel");
const Like = require("../models/likesModel");
const Rate = require("../models/rateModel")

exports.ratePost = async (req, res, next) => {
    try {
        const { postId, userId, rating } = req.body;
        console.log(req.body)
        const isRate = await Rate.findOne({postId, userId});
            if (!isRate) {
                const newRate = new Rate({postId: postId, userId: userId, rate: rating});
                await newRate.save()
                const rate = await Rate.find({postId})
                await console.log(rate)
                const ratee = await rate.map((e) => {
                   return e.rate
                }).reduce((a,b) => a+b);
                await Post.findByIdAndUpdate(postId, {rating: (ratee / rate.length)}, {new: true});
                const posts = await Post.find({})
                await res.json({
                    posts,
                    message: "Вы поставили рейтинг"
                })
            } else {
                const posts = await Post.find({})
                await res.json({
                    posts,
                    message: "Вы уже поставили рейтинг"
                })
            };
            
    } catch (error) {
        next(error)
    }
}

exports.bestPosts = async (req, res, next) => {
    try {
        const bestPosts = await Post.find({rating: 5}).limit(3)
        res.status(200).json({
            bestPosts
        })
    } catch (error) {
        next(error)
    }
}

