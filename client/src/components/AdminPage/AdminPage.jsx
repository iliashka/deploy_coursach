import axios from 'axios'
import QueryString from 'qs'
import React from 'react'
import { Link } from 'react-router-dom'
import AdminLogic from './AdminPageLogic'

function AdminPage({users, authUser, setUsers, setEditPost, setProfileInfo}) {
    const [userPosts, setUserPosts] = React.useState()
    
    
    
    return (
        <div className='col-xl-8 offset-xl-2 mt-4 adminTable' >
            <div style={{marginBottom:'5rem'}}>
                <h1>Страница Администратора</h1>
            </div>
            {users && 
            <table className="col-md-auto  table">
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
                            <td><Link onClick={() => AdminLogic.openProfilePage(user.login, setProfileInfo)} to="/ProfilePage">{user.login}</Link></td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>
                                <div className='dropdown'>
                                    <button onFocus={() => AdminLogic.getUserPosts(user.login, setUserPosts)} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                        Произведения
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        {userPosts && userPosts.map((e) => {
                                            return <li><Link onClick={() => AdminLogic.openEditPage(e._id, setEditPost)} to='/EditPage' >{e.postName}</Link></li>
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
                                        <li><button onClick={() => AdminLogic.deleteUser(user._id, setUsers, authUser)} style = {{ marginRight: '10px' }} className = 'btn btn-danger' type = 'button' >
                                            Удалить Пользователя
                                        </button ></li>
                                        <li><button onClick={() => AdminLogic.changeStatus(user, setUsers, authUser)} style={{marginRight: '10px'}} className='btn btn-warning' type='button'>
                                            {user.status!=='active'?'Активировать':'Заблокировать'}
                                        </button></li>
                                        <li><button onClick={() => AdminLogic.updateRole(user, setUsers, authUser)} className='btn btn-primary' type='button'>
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
