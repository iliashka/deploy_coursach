const User = require('../models/userModel');
const Post = require('../models/postsModel');
const Tags = require('../models/tagsModel');

exports.newTag = async (req, res, next) => {
    try {
        const {tag} = req.body;
        console.log(req.body)
        const question = await Tags.findOne({tagBody: tag})
        await console.log(question)
        if (!question){
            const newTag = await new Tags({tagBody: tag})
            await newTag.save()
            const tags = await Tags.find({})
            // const post = await Post.findById(postId)
            // await post.tags.push(newTag)
            // await post.save();
            // const posts = await Post.find({})
            res.status(200).json({
                tags
            })
        }else{
            res.status(404).json({
                msg: 'Такой тег уже существует'
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.tags = async (req, res, next) => {
    try {
        const tags = await Tags.find({})
        await res.status(200).json({
            tags
        })
    } catch (error) {
        next(error)
    }
}