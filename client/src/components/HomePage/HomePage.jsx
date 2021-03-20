import React from 'react'
import s from './HomePage.module.css'
import Posts from './Posts/Posts'
import { Link } from "react-router-dom";
import axios from 'axios'
import QueryString from 'qs';
import logic from './HomePageLogic'
 
function HomePage({ user, posts, setPosts, setPost, setAuthUser, setProfileInfo, tags = [1], setTags }) {
    const [bestPosts, setBestPosts] = React.useState()
    const [genre, setGenre] = React.useState()
    React.useEffect(() => {
      logic.searchByGenre(genre, setPosts)
    }, [genre, setPosts])
    // window.onload = () => logic.onloadHomePage(setTags, setAuthUser, setTags, setBestPosts)
    
    window.onload = function() {
        const auth = JSON.parse(localStorage.getItem("user"));
        logic.takeAllPosts(setPosts)
        setAuthUser(auth)
        logic.getTags(setTags)
        logic.getBestPosts(setBestPosts)
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
                  {tags && tags.map((e, index) => {
                    return <button key={index} style={{marginRight: '10px', marginBottom: '10px'}} className='btn btn-sm'>{e.label}</button>
                  })}
                </div>
                }
            </div>
            <div className="w-100 d-flex justify-content-between mb-4">
              <div className='dropdown'>
                <button className="btn btn-bd-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Фильтровать по жанру
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li onClick={() => logic.takeAllPosts(setPosts)} class="dropdown-item">Все</li>
                  <li onClick={() => setGenre('Эротика')} class="dropdown-item">Эротика</li>
                  <li onClick={() => setGenre('Фантастика')} class="dropdown-item">Фантастика</li>
                  <li onClick={() => setGenre('Роман')} class="dropdown-item">Роман</li>
                </ul>
              </div>
              <div className='dropdown'>
                <button className="btn btn-bd-light dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                  Фильтровать по жанру
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
            </div>
            <Posts user={user} posts={posts} setPost={setPost} setPosts={setPosts} setProfileInfo={setProfileInfo}/>
        </div>
    )
}

export default HomePage
