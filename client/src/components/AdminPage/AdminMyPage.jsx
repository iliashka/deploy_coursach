import React from 'react'
import { Link } from 'react-router-dom'
import FileLoader from '../FileLoader/FileLoader'
import ReactStars from 'react-rating-stars-component'
import AdminLogic from '../AdminPage/AdminPageLogic'
import ProfileLogic from '../ProfilePage/ProfileLogic'
import PostsLogic from '../HomePage/Posts/PostsLogic'
import EditableLabel from 'react-inline-editing'

function AdminMyPage({ user, authUser, myPageInfo, setEditPost, setMyPageInfo, setUser, setPost, setValue }) {

    return (
        <div className='col-md-auto'>
            <div className='profile_wrapper' style={{ paddingTop: '30px', paddingBottom: '70px', maxWidth: '60%', margin: 'auto', display: 'flex', justifyContent: 'space-between' }}>{myPageInfo &&
                <div>
                    <h2>Страница пользователя: 
                    <EditableLabel
                    text={user.login}
                    labelClassName='myLabelClass'
                    inputClassName='myInputClass'
                    inputWidth='200px'
                    inputHeight='45px'
                    inputMaxLength='50'
                    labelFontWeight='bold'
                    inputFontWeight='bold'
                    onFocusOut={(text) => AdminLogic.handleChangeName(text, setUser, user, authUser)}
                    />
                </h2>
                <h5>Обо мне: 
                    <EditableLabel
                    text={user.aboutMe}
                    labelClassName='myLabelClass'
                    inputClassName='myInputClass'
                    labelFontSize='20px'
                    inputWidth='550px'
                    inputHeight='30px'
                    inputMaxLength='200'
                    labelFontWeight='400'
                    inputFontWeight='400'
                    inputFontSize='20px'
                    onFocusOut={(text) => AdminLogic.handleChangeInfo(text, setUser, user, authUser)}
                    />
                </h5>
                </div>
            }
                {user && !user.avatar?<FileLoader setUser={setUser} user={user} />:<img alt='avatar' style={{width: '100px', height: '100px'}} src={user && user.avatar}/>}
            </div>
            <div style={{ paddingBottom: '70px', maxWidth: '60%', margin: 'auto' }} className='form-select'>
                <select onChange={(e) => ProfileLogic.searchByGenre(e, user, setMyPageInfo)}>
                    <option value="Эротика">Эротика</option>
                    <option value="Фантастика">Фантастика</option>
                    <option value="Роман">Роман</option>
                </select>
            </div>
            {myPageInfo &&
                <table style={{ maxWidth: '60%', margin: 'auto' }} className="table">
                    <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Название Произведения</th>
                            <th scope="col">Жанр Произведения</th>
                            <th scope='col'>Рейтинг</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myPageInfo.posts.map((post, index) =>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{post.postName}</td>
                                <td>{post.genre}</td>
                                <td><ReactStars
                                            count={5}
                                            value={post.rating}
                                            edit={false}
                                            size={18}
                                            activeColor="#ffd700"
                                        /></td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                            Действия
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button onClick = {() => AdminLogic.deletePostHandler(post, authUser, user, setMyPageInfo)} style = {{ marginRight: '10px' }} className = 'btn btn-danger' type = 'button' >
                                                Удалить
                                            </button ></li>
                                            <li><button style={{marginRight: '10px'}} className='btn btn-warning' type='button'>
                                                <Link onClick={() => AdminLogic.openEditPage(post._id, setEditPost, setValue)} to='/EditPage' style={{color: 'white', textDecoration: 'none'}}>Редактировать</Link>
                                            </button></li>
                                            <li><button className='btn btn-primary' type='button'>
                                                <Link onClick={() => PostsLogic.readPostHandler(post, setPost)} to='/PostPage' style={{color: 'white', textDecoration: 'none'}}>Читать</Link>
                                            </button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default AdminMyPage

    
    
