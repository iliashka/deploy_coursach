import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import s from './Header.module.css';
import SearchComponent from './Search/SearchComponent';
import HeaderLogic from './HeaderLogic'

function Header({ setMyPageInfo, user, setUser, setPost, setUsers, setLang, lang }) {
    const logOutHandler = () => {
      setUser(null)
      localStorage.removeItem("user")
    }

    const changeTheme = () => {
      const theme = localStorage.getItem('theme')
      if(theme === 'dark'){
        document.body.classList.toggle('dark')
        localStorage.removeItem('theme')
        localStorage.setItem("theme", "light")
      }else{
        document.body.classList.toggle('dark')
        localStorage.removeItem('theme')
        localStorage.setItem("theme", "dark")
      }
    }
    const changeRu = () => {
      localStorage.removeItem('lang')
      localStorage.setItem("lang", 'ru')
      setLang(prev => prev = true)
    }

    const changeEn = () => {
      localStorage.removeItem('lang')
      localStorage.setItem("lang", 'en')
      setLang(prev => prev = false)
    }

    return (
        <div className='header'>
          <nav className="navbar navbar-light bg-light">
            <Link className={s.logo} onClick={() => document.location.href = 'HomePage'}></Link>
            <div className='local'>
                <button onClick={changeRu} className='btn btn-sm mr-2' type='button'>RU</button>
                <button onClick={changeEn} className='btn btn-sm' type='button'>EN</button>
              </div>
            <div className='firstBlock'>
              <button onClick={changeTheme} className='btn'>{lang===false?'Change Theme':'Изменить тему'}</button>
              {user!==null && user.role==='admin'? <button type='button' className='btn btn-primary adminButton'>
                <Link onClick={() => HeaderLogic.takeUsersHandler(user, setUsers)} style={{color: 'white', textDecoration: 'none'}} to='/AdminPage'>{lang===false?'Admin Page':'Страница Админа'}</Link>
              </button>:<div></div>}
            </div>
            <form className="form-inline">
              <SearchComponent setPost={setPost} lang={lang}/>
              <button style={{marginRight: '10px'}} className="btn btn-primary">
                {user === null?<NavLink onClick={() => console.log(user)} className={s.link} to='/LoginPage'>{lang===false?'Sing In':'Войти'}</NavLink>:
                             <Link to='LoginPage' onClick={logOutHandler} className={s.link}>{lang===false?'Sing Out':'Выйти'}</Link>}
              </button>
              <button style={{marginRight: '10px'}} className='btn btn-primary profileButton'>
                {user === null?<NavLink className={s.link} to='/RegisterPage'>{lang===false?'Sing Up':'Зарегистрироваться'}</NavLink>:
                             <Link onClick={() => HeaderLogic.myPageHandler(user, setMyPageInfo)} to='/MyPage' className={s.link}>{lang===false?'My Profile':'Мой профиль'}</Link>}
              </button>
            </form>
          </nav>
        </div>
    )
}

export default Header
