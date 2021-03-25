import React from 'react'
import s from './HomePage.module.css'
import Posts from './Posts/Posts'
import { Link } from "react-router-dom";
import logic from './HomePageLogic'
 
function HomePage({ user, posts, setPosts, setPost, setAuthUser, setProfileInfo, tags, setTags, lang, setLang }) {
    const [genre, setGenre] = React.useState()
    React.useEffect(() => {
      logic.searchByGenre(genre, setPosts)
    }, [genre, setPosts])
    
    window.onload = function() {
        const auth = JSON.parse(localStorage.getItem("user"));
        logic.takeAllPosts(setPosts)
        setAuthUser(auth)
        logic.getTags(setTags)
        const theme = localStorage.getItem('theme')
        document.body.classList.toggle(theme)
        const language = localStorage.getItem('lang')
        console.log(language)
        if (language === 'ru'){
          setLang(true)
        }else if(language === 'en'){
          setLang(false)
        }
    }
    return (
        <div className={s.wrapper}> 
            <div className={s.header}>
              <h1>{lang===false?`Fanfics`:`Фанфики`}</h1>
              {user !== null?<Link to='/NewPostPage'><button type='button' className='btn btn-primary'>
                <i className="bi bi-plus-circle"/>{lang===false?`Add`:`Добавить`}</button>
              </Link>:<div></div>}
            </div>
            <div className={s.tags}>
                <div style={{width: '40%', textAlign: 'center'}}>
                  {tags && tags.map((e, index) => {
                    return <button key={index} style={{marginRight: '10px', marginBottom: '10px'}} className='btn btn-sm'>{e.label}</button>
                  })}
                </div>
            </div>
            <div className="w-100 d-flex justify-content-between mb-4 filters">
              <div className='dropdown'>
                <button className="btn btn-bd-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  {lang===false?`Filter by genre`:`Фильтровать по жанру`}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li onClick={() => logic.takeAllPosts(setPosts)} className="dropdown-item">{lang===false?`All`:`Все`}</li>
                  <li onClick={() => setGenre('Эротика')} className="dropdown-item">{lang===false?`Erotics`:`Эротика`}</li>
                  <li onClick={() => setGenre('Фантастика')} className="dropdown-item">{lang===false?`Fantastic`:`Фантастика`}</li>
                  <li onClick={() => setGenre('Роман')} className="dropdown-item">{lang===false?`Novel`:`Роман`}</li>
                </ul>
              </div>
              <div className='dropdown'>
                <button className="btn btn-bd-light dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                  {lang===false?`Other filters`:`Другие фильтры`}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                  <li onClick={() => logic.getBestPosts(setPosts)} className="dropdown-item" >{lang===false?`Top 3 rated`:`Топ 3 по рейтингу`}</li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <Posts lang={lang} user={user} posts={posts} setPost={setPost} setPosts={setPosts} setProfileInfo={setProfileInfo}/>
        </div>
    )
}

export default HomePage
