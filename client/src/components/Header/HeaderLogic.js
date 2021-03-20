import axios from 'axios';
import qs from 'qs'

const myPageHandler = (user, setMyPageInfo) => {
    axios.post('api/takeUserProfileInfo', qs.stringify({login: user.login}))
    .then((res) => {
      setMyPageInfo(res.data.data)
    })
}

const takeUsersHandler = (user, setUsers) => {
    axios.post('api/users', qs.stringify({userId: user.id}))
    .then((res) => {
      setUsers(res.data.users)
    })
}

const readPostHandler = (id, setPost, setPostsList) => {
    axios.post('api/post', qs.stringify({postId: id}))
    .then((res) => {
        setPost(res.data.post)
        setPostsList([])
    })
}

const postData = (input, setPostsList) => {
    axios.post('api/search', qs.stringify({text: input}))
    .then((res) => {
        setPostsList(res.data);
    })
}

const HeaderLogic = {
    myPageHandler,
    takeUsersHandler,
    readPostHandler,
    postData
}

export default HeaderLogic 