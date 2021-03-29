import React from 'react'
import ReactStars from 'react-rating-stars-component'
import ReactMarkdown from "react-markdown";
import PostsLogic from './PostsLogic';
import Pdf from "react-to-pdf";

function PostPage({ user, post, setPosts, lang }) {
    const refPdf = React.createRef()
    return (
        <div>
            
            <div ref={refPdf} className="card border-secondary" style={{ maxWidth: '80%', margin: 'auto', marginTop: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="card-header">
                    <h3 style={{ marginLeft: '1rem' }}>{lang===false?`Author: `:`Автор: `} {post && post.login}</h3>
                    <h3 style={{ marginRight: '1rem' }}>{lang===false?`Genre: `:`Жанр:`} {post && post.genre}</h3>
                </div>
                <div className="card-body text-dark">
                    <h5 className="card-title">{post && post.postName}</h5>
                    <h6 className='card-text'>{post && post.summary}</h6>
                    <ReactMarkdown className='card-text' source={post && post.post} />
                </div>
                <div className='border' style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <h5 style={{marginBottom: '0px', marginRight: '15px'}}>{lang===false?`Rate post`:`Оценить произведение`}</h5>
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
            <div style={{width: '80%'}} className='d-flex m-auto justify-content-end export'>
                <Pdf targetRef={refPdf} filename="chudo.pdf">
                    {({ toPdf }) => <button className='btn btn-primary mt-4' onClick={toPdf}>{lang===false?`Export in PDF`:`Экспорт в PDF`}</button>}
                </Pdf>
            </div>
            
        </div>
    )
}

export default PostPage
