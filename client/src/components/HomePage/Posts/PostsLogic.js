import axios from 'axios';
import qs from 'qs'

const openProfilePage = (post, setProfileInfo) => {
    axios.post('api/takeUserProfileInfo', qs.stringify({ login: post.login }))
        .then((res) => {
            setProfileInfo(res.data.data)
        })
}

const likeHandlerPlus = (post, user, setPosts) => {
    if (user === null) {
        alert('Чтобы оценить произведение, сначала войдите в систему!')
    } else {
        axios.put('api/plusLike', qs.stringify({ postId: post._id, userId: user.id }))
            .then((res) => {
                setPosts(res.data.posts)
            })
    }
}

const ratingChange = (post, newRating, user, setPosts) => {
    if (user === null) {
        alert('Чтобы поставить рейтинг, сначала войдите в систему!')
    } else {
        axios.put('api/ratePost', qs.stringify({ postId: post._id, userId: user.id, rating: newRating }))
            .then((res) => {
                alert(res.data.message)
                setPosts(res.data.posts)
            })
    }
}

const readPostHandler = (post, setPost) => {
    axios.post('api/post', qs.stringify({ postId: post._id }))
        .then((res) => {
            setPost(res.data.post)
        })
}

const sendCommentHandler = (post, user, setPosts, commentBody) => {
    if(user === null){
        alert('Чтобы добавить комментарий, сначала войдите в систему.')
    }else{
        axios.put('api/addComment', qs.stringify({postId: post._id, userLogin: user.login, comment: commentBody}))
        .then((res) => {
        setPosts(res.data.posts)
    })
    }
}

const editPostHandler = (value, preEditPost, editPost) => {
    axios.put('api/editPost', qs.stringify({ genre: preEditPost.genre,
                                        id: editPost._id, 
                                        summary: preEditPost.summary, 
                                        postName: preEditPost.postName, 
                                        post: value }))
    .then((res)=> {
        alert(res.data.message)
    })
}


const PostsLogic = {
    openProfilePage,
    likeHandlerPlus,
    ratingChange,
    readPostHandler,
    sendCommentHandler,
    editPostHandler
}

export default PostsLogic 