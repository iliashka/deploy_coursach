import axios from 'axios';
import qs from 'qs'

const deleteUser = (id, setUsers, user) => {
    axios.put('api/deleteUser', qs.stringify({userId: user.id, deletedId: id}))
    .then((res) => {
        alert(res.data.message);
        setUsers(res.data.users)
    })
    .catch(err => {
        console.log(err)
        document.location.href = '/Error'
      })
}

const updateRole = (updatedUser, setUsers, authUser) => {
    if (updatedUser.role === 'admin') {
        axios.put('api/updateUser', qs.stringify({userId: authUser.id, updateId: updatedUser._id, update: {role:'user'}}))
        .then((res)=> {
            setUsers(res.data.users)
        })
        .catch(err => {
            console.log(err)
            document.location.href = '/Error'
          })
    }else{
        axios.put('api/updateUser', qs.stringify({userId: authUser.id, updateId: updatedUser._id, update: {role:'admin'}}))
        .then((res)=> {
            setUsers(res.data.users)
        })
        .catch(err => {
            console.log(err)
            document.location.href = '/Error'
          })
    }
}
const changeStatus = (updatedUser, setUsers, authUser) => {
    if (updatedUser.status === 'active') {
        axios.put('api/updateUser', qs.stringify({userId: authUser.id, updateId: updatedUser._id, update: {status:'blocked'}}))
        .then((res)=> {
            setUsers(res.data.users)
        })
        .catch(err => {
            console.log(err)
            document.location.href = '/Error'
          })
    }else{
        axios.put('api/updateUser', qs.stringify({userId: authUser.id, updateId: updatedUser._id, update: {status:'active'}}))
        .then((res)=> {
            setUsers(res.data.users)
        })
        .catch(err => {
            console.log(err)
            document.location.href = '/Error'
          })
    }
}

const getUserPosts = (login, setUserPosts) => {
    axios.post('api/takeUserProfileInfo', qs.stringify({login: login}))
    .then((res) => {
        setUserPosts(res.data.data.posts)
    })
    .catch(err => {
        console.log(err)
        document.location.href = '/Error'
      })
}
const openEditPage = (id, setEditPost, setValue) => {
    axios.post('api/post', qs.stringify({postId: id}))
    .then(res => {
        setEditPost(res.data.post)
        setValue(res.data.post.post)
    })
    .catch(err => {
        console.log(err)
        document.location.href = '/Error'
      })
}
const openProfilePage = (login, setProfileInfo) => {
    axios.post('api/takeUserProfileInfo', qs.stringify({ login: login }))
        .then((res) => {
            setProfileInfo(res.data.data)
        })
        .catch(err => {
            console.log(err)
            document.location.href = '/Error'
          })
}
const handleChangeInfo = (text, setUser, user, authUser) => {
    console.log('Left editor with text: ' + text);
    axios.put('api/updateUser', qs.stringify({userId: authUser.id, updateId: user._id, update: {aboutMe: text}}))
    .then((res) => {
        setUser(res.data.user)
    })
    .catch(err => {
        console.log(err)
        document.location.href = '/Error'
      })
} 
const handleChangeName = (text, setUser, user, authUser) => {
    console.log('Left editor with text: ' + text);
    axios.put('api/updateUser', qs.stringify({userId: authUser.id, updateId: user._id, update: {login: text}}))
    .then((res) => {
        setUser(res.data.user)
    })
    .catch(err => {
        console.log(err)
        document.location.href = '/Error'
      })
}
const deletePostHandler = (post, authUser, user, setMyPageInfo) => {
    axios.put('api/deletePost', qs.stringify({ postId: post._id, userId: authUser.id, deletedId: user._id }))
        .then((res) => {
            setMyPageInfo(res.data)
        })
        .catch(err => {
            console.log(err)
            document.location.href = '/Error'
          })
}

const AdminLogic = {
    deleteUser,
    updateRole,
    changeStatus,
    openProfilePage,
    openEditPage,
    getUserPosts,
    handleChangeInfo,
    handleChangeName,
    deletePostHandler
}

export default AdminLogic 