import axios from 'axios'
import QueryString from 'qs'
import React from 'react'
import { Link } from 'react-router-dom'

function AdminPage({users, user, setUsers, setEditPost, setProfileInfo}) {
    const [userPosts, setUserPosts] = React.useState()
    function deleteUser(id) {
        axios.put('api/deleteUser', QueryString.stringify({userId: user.id, deletedId: id}))
        .then((res) => {
            alert(res.data.message);
            setUsers(res.data.users)
        })
    }
    function updateRole(updatedUser) {
        if (updatedUser.role === 'admin') {
            axios.put('api/updateUser', QueryString.stringify({userId: user.id, updateId: updatedUser._id, update: {role:'user'}}))
            .then((res)=> {
                setUsers(res.data.users)
            })
        }else{
            axios.put('api/updateUser', QueryString.stringify({userId: user.id, updateId: updatedUser._id, update: {role:'admin'}}))
            .then((res)=> {
                setUsers(res.data.users)
            })
        }
    }
    function changeStatus(updatedUser) {
        if (updatedUser.status === 'active') {
            axios.put('api/updateUser', QueryString.stringify({userId: user.id, updateId: updatedUser._id, update: {status:'blocked'}}))
            .then((res)=> {
                setUsers(res.data.users)
            })
        }else{
            axios.put('api/updateUser', QueryString.stringify({userId: user.id, updateId: updatedUser._id, update: {status:'active'}}))
            .then((res)=> {
                setUsers(res.data.users)
            })
        }
    }
    function getUserPosts(login) {
        axios.post('api/takeUserProfileInfo', QueryString.stringify({login: login}))
        .then((res) => {
            setUserPosts(res.data.data.posts)
        })
    }
    function openEditPage(id) {
        axios.post('api/post', QueryString.stringify({postId: id}))
        .then(res => {
            setEditPost(res.data.post)
        })
    }
    function openProfilePage(login) {
        axios.post('api/takeUserProfileInfo', QueryString.stringify({ login: login }))
            .then((res) => {
                setProfileInfo(res.data.data)
            })
    }
    return (
        <div className='adminTable' >
            <div style={{marginBottom:'5rem'}}>
                <h1>Страница Администратора</h1>
            </div>
            {users && 
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Имя Пользователя</th>
                        <th scope="col">Email пользователя</th>
                        <th scope='col'>Роль Пользователя</th>
                        <th scope='col'>Статус Пользователя</th>
                        <th scope='col'>Произведения Пользователя</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                       return <tr>
                            <th scope='row'>{index + 1}</th>
                            <td><Link onClick={() => openProfilePage(user.login)} to="/ProfilePage">{user.login}</Link></td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>
                                <div className='dropdown'>
                                    <button onFocus={() => getUserPosts(user.login)} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                        Произведения
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        {userPosts && userPosts.map((e) => {
                                            return <li><Link onClick={() => openEditPage(e._id)} to='/EditPage' >{e.postName}</Link></li>
                                        })}
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                        Действия
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <li><button onClick={() => deleteUser(user._id)} style = {{ marginRight: '10px' }} className = 'btn btn-danger' type = 'button' >
                                            Удалить Пользователя
                                        </button ></li>
                                        <li><button onClick={() => changeStatus(user)} style={{marginRight: '10px'}} className='btn btn-warning' type='button'>
                                            {user.status!=='active'?'Активировать':'Заблокировать'}
                                        </button></li>
                                        <li><button onClick={() => updateRole(user)} className='btn btn-primary' type='button'>
                                            {user.role!=='admin'?'Сделать Админом':'Сделать юзером'}
                                        </button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            }
        </div>
    )
}

export default AdminPage
