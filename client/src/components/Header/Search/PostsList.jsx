import React from 'react'
import { Link } from 'react-router-dom';
import HeaderLogic from '../HeaderLogic'

function PostsList({postsList=[], setPost, setPostsList}) {
    return (
        <div>
            {postsList.map((e, index) => {
                if (e) {
                    return (
                        <div style={{ position: 'absolute', background: 'white', width: '20rem', display: 'flex', justifyContent: 'space-between'}} className='border' key={e.postName}>
                            <h5>{e.postName}</h5>
                            <button className='btn btn-primary' type='button'>
                                <Link onClick={() => HeaderLogic.readPostHandler(e._id, setPost, setPostsList)} style={{color: 'white', textDecoration: 'none'}} to='/PostPage'>Открыть</Link>
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
