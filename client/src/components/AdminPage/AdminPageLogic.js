import axios from 'axios';
import qs from 'qs'

const deleteUser = (id, setUsers, user) => {
    axios.put('api/deleteUser', qs.stringify({userId: user.id, deletedId: id}))
    .then((res) => {
        alert(res.data.message);
        setUsers(res.data.users)
    })
}

const updateRole = (updatedUser, setUsers, authUser) => {
    if (updatedUser.role === 'admin') {
        axios.put('api/updateUser', qs.stringify({userId: authUser.id, updateId: updatedUser._id, update: {role:'user'}}))
        .then((res)=> {
            setUsers(res.data.users)
        })
    }else{
        axios.put('api/updateUser', qs.stringify({userId: authUser.id, updateId: updatedUser._id, update: {role:'admin'}}))
        .then((res)=> {
            setUsers(res.data.users)
        })
    }
}
const changeStatus = (updatedUser, setUsers, authUser) => {
    if (updatedUser.status === 'active') {
        axios.put('api/updateUser', qs.stringify({userId: authUser.id, updateId: updatedUser._id, update: {status:'blocked'}}))
        .then((res)=> {
            setUsers(res.data.users)
        })
    }else{
        axios.put('api/updateUser', qs.stringify({userId: authUser.id, updateId: updatedUser._id, update: {status:'active'}}))
        .then((res)=> {
            setUsers(res.data.users)
        })
    }
}

const getUserPosts = (login, setUserPosts) => {
    axios.post('api/takeUserProfileInfo', qs.stringify({login: login}))
    .then((res) => {
        setUserPosts(res.data.data.posts)
    })
}
const openEditPage = (id, setEditPost, setValue) => {
    axios.post('api/post', qs.stringify({postId: id}))
    .then(res => {
        setEditPost(res.data.post)
        setValue(res.data.post.post)
    })
}
const openProfilePage = (login, setProfileInfo) => {
    axios.post('api/takeUserProfileInfo', qs.stringify({ login: login }))
        .then((res) => {
            setProfileInfo(res.data.data)
        })
}
const handleChangeInfo = (text, setUser, user, authUser) => {
    console.log('Left editor with text: ' + text);
    axios.put('api/updateUser', qs.stringify({userId: authUser.id, updateId: user._id, update: {aboutMe: text}}))
    .then((res) => {
        setUser(res.data.user)
    })
} 
const handleChangeName = (text, setUser, user, authUser) => {
    console.log('Left editor with text: ' + text);
    axios.put('api/updateUser', qs.stringify({userId: authUser.id, updateId: user._id, update: {login: text}}))
    .then((res) => {
        setUser(res.data.user)
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
    handleChangeName
}

export default AdminLogic 