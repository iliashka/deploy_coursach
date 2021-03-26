import axios from 'axios';
import qs from 'qs'

const searchByGenre = (e, user, setMyPageInfo) => {
    axios.post('api/getPostsByGenre', qs.stringify({ genre: e.target.value, id: user.id }))
        .then((res) => {
            setMyPageInfo(res.data)
        })
        .catch(err => {
            console.log(err)
            document.location.href = '/Error'
          })
}

const deletePostHandler = (post, user, setMyPageInfo) => {
    axios.put('api/deletePost', qs.stringify({ postId: post._id, userId: user.id, deletedId: user.id }))
        .then((res) => {
            setMyPageInfo(res.data)
        })
        .catch(err => {
            console.log(err)
            document.location.href = '/Error'
          })
}

const handleChangeInfo = (text, setUser, user) => {
    console.log('Left editor with text: ' + text);
    axios.put('api/updateUser', qs.stringify({userId: user.id, updateId: user.id, update: {aboutMe: text}}))
    .then((res) => {
        setUser(res.data.user)
        localStorage.removeItem("user")
        localStorage.setItem("user", JSON.stringify(res.data.user))
    })
    .catch(err => {
        console.log(err)
        document.location.href = '/Error'
      })
} 
const handleChangeName = (text, setUser, user) => {
    console.log('Left editor with text: ' + text);
    axios.put('api/updateUser', qs.stringify({userId: user.id, updateId: user.id, update: {login: text}}))
    .then((res) => {
        setUser(res.data.user)
        localStorage.removeItem("user")
        localStorage.setItem("user", JSON.stringify(res.data.user))
    })
    .catch(err => {
        console.log(err)
        document.location.href = '/Error'
      })
}

const ProfileLogic = {
    searchByGenre,
    deletePostHandler,
    handleChangeInfo,
    handleChangeName
}

export default ProfileLogic 