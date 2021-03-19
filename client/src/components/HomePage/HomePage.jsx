import React from 'react'
import s from './HomePage.module.css'
import Posts from './Posts/Posts'
import { Link } from "react-router-dom";
import axios from 'axios'

function HomePage({ user, posts, setPosts, setPost, setAuthUser, setProfileInfo, tags, setTags }) {
    const [bestPosts, setBestPosts] = React.useState()

    window.onload = function() {
        const auth = JSON.parse(localStorage.getItem("user"));
        axios.get('api/posts')
        .then((res) => {
        setPosts(res.data.posts)
        })
        setAuthUser(auth)
        axios.get('api/tags')
        .then((res) => {
          setTags(res.data.tags.map(e => e.tagBody))
        })
        axios.get('api/bestPosts')
        .then((res) => {
          setBestPosts(res.data.bestPosts)
        })
    }
    return (
        <div className={s.wrapper}> 
            <div className={s.header}>
              <h1>Фанфики</h1>
              {user !== null?<Link to='/NewPostPage'><button type='button' className='btn btn-primary'>
                <i className="bi bi-plus-circle"/> Добавить</button>
              </Link>:<div></div>}
            </div>
            <div className={s.tags}>
            {tags && 
                <div style={{width: '40%', textAlign: 'center'}}>
                  {tags.map((e, index) => {
                    return <button key={index} style={{marginRight: '10px', marginBottom: '10px'}} className='btn btn-sm'>{e.label}</button>
                  })}
                </div>
                }
            </div>
            <div className="w-100 d-flex justify-content-between">
              <select name="" id="" className="select">
          
              </select>
              <select name="" id="" className="select">

              </select>
            </div>
            <Posts user={user} posts={posts} setPost={setPost} setPosts={setPosts} setProfileInfo={setProfileInfo}/>
        </div>
    )
}

export default HomePage
