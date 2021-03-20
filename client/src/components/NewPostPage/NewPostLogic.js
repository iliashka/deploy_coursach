import axios from 'axios';
import qs from 'qs'

const newPostHandler = (preTags, value, newPost, user) => {
    axios.post('api/newPost', qs.stringify({
        tags: preTags[0],
        post: value,
        postName: newPost.postName,
        genre: newPost.genre,
        summary: newPost.summary,
        login: user.login
    }))
        .then((res) => {
            console.log(res.data.data);
        })
}

const NewPostLogic = {
    newPostHandler
}

export default NewPostLogic 