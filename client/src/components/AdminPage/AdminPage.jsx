import React from 'react'
import { Link } from 'react-router-dom'
import AdminLogic from './AdminPageLogic'
import HeaderLogic from '../Header/HeaderLogic'


function AdminPage({users, authUser, setUsers, setEditPost, setMyPageInfo, setEditedUser, setValue, lang}) {
    const [userPosts, setUserPosts] = React.useState()


    const openProfilePage = (user, setMyPageInfo) => {
        HeaderLogic.myPageHandler(user, setMyPageInfo)
        setEditedUser(user)
    }
    return (
        <div className='col-xl-8 offset-xl-2 mt-4 adminTable' >
            <div style={{marginBottom:'5rem'}}>
                <h1>{lang===false?'Admin Page':'Страница Администратора'}</h1>
            </div>
            {users && 
            <table className="col-md-auto  table">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">{lang===false?'User Name':'Имя Пользователя'}</th>
                        <th scope="col">{lang===false?'User Email':'Email пользователя'}</th>
                        <th scope='col'>{lang===false?'User role':'Роль Пользователя'}</th>
                        <th scope='col'>{lang===false?'User status':'Статус Пользователя'}</th>
                        <th scope='col'>{lang===false?'User posts':'Произведения Пользователя'}</th>
                        <th scope="col">{lang===false?'Actions':'Действия'}</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                       return <tr>
                            <th scope='row'>{index + 1}</th>
                            <td><Link onClick={() => openProfilePage(user, setMyPageInfo)} to="/AdminMyPage">{user.login}</Link></td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>
                                <div className='dropdown'>
                                    <button onFocus={() => AdminLogic.getUserPosts(user.login, setUserPosts)} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                        {lang===false?'Posts':'Произведения'}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        {userPosts && userPosts.map((e) => {
                                            return <li><Link onClick={() => AdminLogic.openEditPage(e._id, setEditPost, setValue)} to='/EditPage' >{e.postName}</Link></li>
                                        })}
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                    {lang===false?'Actions':'Действия'}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <li><button onClick={() => AdminLogic.deleteUser(user._id, setUsers, authUser)} style = {{ marginRight: '10px' }} className = 'btn btn-danger' type = 'button' >
                                            {lang===false?'Delete User':'Удалить Пользователя'}
                                        </button ></li>
                                        <li><button onClick={() => AdminLogic.changeStatus(user, setUsers, authUser)} style={{marginRight: '10px'}} className='btn btn-warning' type='button'>
                                            {user.status!=='active'?lang===false?'Activate':'Активировать':lang===false?'Block':'Заблокировать'}
                                        </button></li>
                                        <li><button onClick={() => AdminLogic.updateRole(user, setUsers, authUser)} className='btn btn-primary' type='button'>
                                            {user.role!=='admin'?lang===false?'Make Admin':'Сделать Админом':lang===false?'Make User':'Сделать юзером'}
                                        </button></li>
                                        <li><Link onClick={() => setEditedUser(user)} to='/NewAdminPostPage'>
                                            <button style = {{ marginRight: '10px' }} className = 'btn btn-info' type = 'button' >
                                                {lang===false?`Make post as User`:`Создать пост как юзер `}
                                            </button >
                                        </Link></li>
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
