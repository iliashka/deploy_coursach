import axios from 'axios'
import QueryString from 'qs'
import React from 'react'
import { Link } from 'react-router-dom'

function PostsList({postsList=[], setPost, setPostsList}) {

    function readPostHandler (id){
        axios.post('api/post', QueryString.stringify({postId: id}))
        .then((res) => {
            setPost(res.data.post)
            setPostsList([])
        })
    }
    return (
        <div>
            {postsList.map((e, index) => {
                if (e) {
                    return (
                        <div style={{ position: 'absolute', background: 'white', width: '20rem', display: 'flex', justifyContent: 'space-between'}} className='border' key={e.postName}>
                            <h5>{e.postName}</h5>
                            <button className='btn btn-primary' type='button'>
                                <Link onClick={() => readPostHandler(e._id)} style={{color: 'white', textDecoration: 'none'}} to='/PostPage'>Открыть</Link>
                            </button>
                        </div>
                    )
                }
                return null;
            })}
        </div>
    )
}

export default PostsList
