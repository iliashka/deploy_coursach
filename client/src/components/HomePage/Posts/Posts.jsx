import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import ReactMarkdown from "react-markdown";
import logic from '../HomePageLogic'
import PostsLogic from './PostsLogic'



function Posts({ user, posts, setPost, setPosts, setProfileInfo }) {
    const [commentBody, setCommentBody] = React.useState()
    const [count, setCount] = React.useState(0)

    const updateCount = () => {
        setCount(count + 1)
    }

    React.useEffect(() => {
        logic.takeAllPosts(setPosts)
    }, [count, setPosts])

    return (
        <div className='wrapper'>
            {posts && posts.map((post, index) => {
                return <div className="card border-secondary mb-3" >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} className="card-header">
                        <h3 style={{ marginLeft: '1rem' }}>Автор: <Link to="/ProfilePage" onClick={() => PostsLogic.openProfilePage(post, setProfileInfo)}>{post.login}</Link></h3>
                        <h3 style={{ marginRight: '1rem' }}>Жанр: {post.genre}</h3>
                        <button className='btn btn-primary' type='button'>
                            <Link onClick={() => PostsLogic.readPostHandler(post, setPost)} to='/PostPage' style={{ color: 'white', textDecoration: 'none' }}>Читать</Link>
                        </button>
                    </div>
                    <div className="card-body text-dark border-secondary">
                        <h5 className="card-title">Название произведения: <br/><h4>{post.postName}</h4><hr/></h5>
                        <h5 className="card-title">Краткое описание: <br/><h6>{post.summary}</h6><hr/></h5>
                        <h5 className="card-text">Произведение: <br/></h5>
                        <ReactMarkdown source={post.post} />
                    </div>
                    <div className='border' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className='dropdown' style={{marginLeft: '15px'}}>
                                <button onFocus={updateCount} className="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    Комментарии <i className="bi bi-chat-left-dots"></i>
                                </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {post.comments.map((comment) => {
                                    return <li>
                                            <div style={{ height: '20px', display: 'flex', alignItems: 'center'}}>
                                                <h6>{comment.userLogin}: </h6>
                                                <p style={{marginBottom: '7px', marginLeft: '15px'}}>{comment.comment}</p>
                                            </div>
                                           </li>
                                })}
                                <li>
                                    <div style={{display:'flex'}}>
                                        <input onChange={(e) => setCommentBody(e.target.value)} type="text" placeholder='Добавить комментарий'/>
                                        <button onClick={() => PostsLogic.sendCommentHandler(post, user, setPosts, commentBody)} style={{marginLeft: '15px'}} type='button' className='btn btn-primary'>Отправить</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <h5 style={{ marginBottom: '0', marginRight: '15px', paddingBottom: '0' }}>Средний рейтинг:</h5>
                            <ReactStars
                                count={5}
                                value={post.rating}
                                edit={false}
                                onChange={(newRating) => PostsLogic.ratingChange(post, setPosts, newRating, user)}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </div>
                        <div style={{display: 'flex'}}>
                            <h5 style={{ marginLeft: '20px', marginBottom: '0', marginRight: '15px' }}>Лайков: {post.likesCount}</h5>
                            <i onClick={() => PostsLogic.likeHandlerPlus(post, user, setPosts)} style={{ paddingRight: '15px', cursor: 'pointer' }} className="bi bi-hand-thumbs-up">Оценить</i>
                        </div>
                    </div>
                    {post.tags !== [] && 
                        <div className='border' style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '15px' }}>
                            <h5 style={{ marginBottom: '0', marginRight: '15px', paddingBottom: '0' }}>Тэги:</h5>
                            {post.tags.map((tag) => {
                                return <button style={{marginRight: '10px'}} className='btn btn-sm'>{tag.label}</button>
                            })}
                        </div>
                    }
                </div>
            })}
        </div>
    )
}

export default Posts
