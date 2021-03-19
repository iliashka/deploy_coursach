import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import ReactMarkdown from "react-markdown";



function Posts({ user, posts, setPost, setPosts, setProfileInfo }) {
    const [commentBody, setCommentBody] = React.useState()
    const [count, setCount] = React.useState(0)

    const updateCount = () => {
        setCount(count + 1)
        console.log(count)
    }

    React.useEffect(() => {
        console.log(count)
        axios.get('api/posts')
        .then((res) => {
            setPosts(res.data.posts)
        })
    }, [count, setPosts])


    function openProfilePage(post) {
        axios.post('api/takeUserProfileInfo', qs.stringify({ login: post.login }))
            .then((res) => {
                setProfileInfo(res.data.data)
            })
    }

    function likeHandlerPlus(post) {
        if (user === null) {
            alert('Чтобы оценить произведение, сначала войдите в систему!')
        } else {
            axios.put('api/plusLike', qs.stringify({ postId: post._id, userId: user.id }))
                .then((res) => {
                    console.log(res.data)
                    setPosts(res.data.posts)
                })
        }
    }

    function ratingChange(post, newRating) {
        if (user === null) {
            alert('Чтобы поставить рейтинг, сначала войдите в систему!')
        } else {
            axios.put('api/ratePost', qs.stringify({ postId: post._id, userId: user.id, rating: newRating }))
                .then((res) => {
                    alert(res.data.message)
                    setPosts(res.data.posts)
                })
        }
    }

    function readPostHandler(post) {
        console.log(post)
        axios.post('api/post', qs.stringify({ postId: post._id }))
            .then((res) => {
                setPost(res.data.post)
            })
    }

    function sendCommentHandler(post) {
        if(user === null){
            alert('Чтобы добавить комментарий, сначала войдите в систему.')
        }else{
            axios.put('api/addComment', qs.stringify({postId: post._id, userLogin: user.login, comment: commentBody}))
            .then((res) => {
            setPosts(res.data.posts)
        })
        }
    }

    return (
        <div className='wrapper'>
            {posts && posts.map((post, index) => {
                return <div className="card border-secondary mb-3" >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} className="card-header">
                        <h3 style={{ marginLeft: '1rem' }}>Автор: <Link to="/ProfilePage" onClick={() => openProfilePage(post)}>{post.login}</Link></h3>
                        <h3 style={{ marginRight: '1rem' }}>Жанр: {post.genre}</h3>
                        <button className='btn btn-primary' type='button'>
                            <Link onClick={() => readPostHandler(post)} to='/PostPage' style={{ color: 'white', textDecoration: 'none' }}>Читать</Link>
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
                                        <button onClick={() => sendCommentHandler(post)} style={{marginLeft: '15px'}} type='button' className='btn btn-primary'>Отправить</button>
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
                                onChange={(newRating) => ratingChange(post, newRating)}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </div>
                        <div style={{display: 'flex'}}>
                            <h5 style={{ marginLeft: '20px', marginBottom: '0', marginRight: '15px' }}>Лайков: {post.likesCount}</h5>
                            <i onClick={() => likeHandlerPlus(post)} style={{ paddingRight: '15px', cursor: 'pointer' }} className="bi bi-hand-thumbs-up">Оценить</i>
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
