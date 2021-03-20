import React from 'react'
import ReactStars from 'react-rating-stars-component'
import ReactMarkdown from "react-markdown";
import PostsLogic from './PostsLogic'

function PostPage({ user, post, setPosts }) {
    return (
        <div>
            <div className="card border-secondary mb-3" style={{ maxWidth: '80%', margin: 'auto', marginTop: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="card-header">
                    <h3 style={{ marginLeft: '1rem' }}>Автор: {post && post.login}</h3>
                    <h3 style={{ marginRight: '1rem' }}>Жанр: {post && post.genre}</h3>
                </div>
                <div className="card-body text-dark">
                    <h5 className="card-title">{post && post.postName}</h5>
                    <h6 className='card-text'>{post && post.summary}</h6>
                    <ReactMarkdown className='card-text' source={post && post.post} />
                </div>
                <div className='border' style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <h5 style={{marginBottom: '0px', marginRight: '15px'}}>Оценить произведение</h5>
                            <ReactStars
                                count={5}
                                onChange={(newRating) => PostsLogic.ratingChange(post, newRating, user, setPosts)}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </div>
                        <i onClick={() => PostsLogic.likeHandlerPlus(post, user, setPosts)} style={{marginLeft:'rem', paddingRight: '15px', cursor: 'pointer' }} className="bi bi-hand-thumbs-up">Поставить лайк</i>
                    </div>
            </div>
        </div>
    )
}

export default PostPage
