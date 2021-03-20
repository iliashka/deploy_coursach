import axios from 'axios';
import qs from 'qs'

const searchByGenre = (e, user, setMyPageInfo) => {
    axios.post('api/getPostsByGenre', qs.stringify({ genre: e.target.value, id: user.id }))
        .then((res) => {
            setMyPageInfo(res.data)
        })
}

const deletePostHandler = (post, user, setMyPageInfo) => {
    axios.put('api/deletePost', qs.stringify({ postId: post._id, userId: user.id }))
        .then((res) => {
            setMyPageInfo(res.data)
        })
}

const ProfileLogic = {
    searchByGenre,
    deletePostHandler
}

export default ProfileLogic 