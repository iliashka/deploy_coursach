const User = require('../models/userModel');
const Post = require('../models/postsModel');
const Tags = require('../models/tagsModel');

exports.newTag = async (req, res, next) => {
    try {
        const {postId, tag} = req.body;
        const question = await Tags.find({tag})
        if (!tag){
            const newTag = await new Tags({postId: postId, tagBody: tag})
            await newTag.save()
            const post = await Post.findById(postId)
            await post.tags.push(newTag)
            await post.save()
            res.status(200).json({
                post
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