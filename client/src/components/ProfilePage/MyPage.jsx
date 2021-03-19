import axios from 'axios'
import qs from 'qs'
import React from 'react'
import { Link } from 'react-router-dom'
import FileLoader from '../FileLoader/FileLoader'
import ReactStars from 'react-rating-stars-component'

function MyPage({ user, myPageInfo, setEditPost, setMyPageInfo, setUser, setPost }) {

    const searchByGenre = (e) => {
        axios.post('api/getPostsByGenre', qs.stringify({ genre: e.target.value, id: user.id }))
            .then((res) => {
                setMyPageInfo(res.data)
            })
    }

    function deletePostHandler(post) {
        axios.put('api/deletePost', qs.stringify({ postId: post._id, userId: user.id }))
            .then((res) => {
                setMyPageInfo(res.data)
            })
    }

    function readPostHandler(post) {
        axios.post('api/post', qs.stringify({ postId: post._id }))
            .then((res) => {
                setPost(res.data.post)
            })
    }

    function editPostHandler(post) {
        axios.post('api/post', qs.stringify({ postId: post._id }))
            .then((res) => {
                setEditPost(res.data.post)
            })
    }

    return (
        <div className='col-md-auto'>
            <div className='profile_wrapper' style={{ paddingTop: '30px', paddingBottom: '70px', maxWidth: '60%', margin: 'auto', display: 'flex', justifyContent: 'space-between' }}>{myPageInfo &&
                <h1>Страница пользователя: {myPageInfo.user.login}</h1>
            }
                {user && !user.avatar?<FileLoader setUser={setUser} user={user} />:<img alt='avatar' style={{width: '100px', height: '100px'}} src={user && user.avatar}/>}
            </div>
            <div style={{ paddingBottom: '70px', maxWidth: '60%', margin: 'auto' }} className='form-select'>
                <select onChange={searchByGenre}>
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
                                            <li><button onClick = {() => deletePostHandler(post)} style = {{ marginRight: '10px' }} className = 'btn btn-danger' type = 'button' >
                                                Удалить
                                            </button ></li>
                                            <li><button style={{marginRight: '10px'}} className='btn btn-warning' type='button'>
                                                <Link onClick={() => editPostHandler(post)} to='/EditPage' style={{color: 'white', textDecoration: 'none'}}>Редактировать</Link>
                                            </button></li>
                                            <li><button className='btn btn-primary' type='button'>
                                                <Link onClick={() => readPostHandler(post)} to='/PostPage' style={{color: 'white', textDecoration: 'none'}}>Читать</Link>
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

export default MyPage

    
    
