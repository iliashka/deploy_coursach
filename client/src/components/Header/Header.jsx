import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import s from './Header.module.css';
import SearchComponent from './Search/SearchComponent';
import HeaderLogic from './HeaderLogic'

function Header({ setMyPageInfo, user, setUser, setPost, setUsers }) {
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
        console.log(localStorage.getItem('theme'))
      }else{
        document.body.classList.toggle('dark')
        localStorage.removeItem('theme')
        localStorage.setItem("theme", "dark")
        console.log(localStorage.getItem('theme'))
      }
    }

    return (
        <div className='header'>
          <nav className="navbar navbar-light bg-light">
            <Link className={s.logo} onClick={() => document.location.href = 'HomePage'}></Link>
            <div className='firstBlock'>
              <button onClick={changeTheme} className='btn'>Сменить тему</button>
              {user!==null && user.role==='admin'? <button type='button' className='btn btn-primary adminButton'>
                <Link onClick={() => HeaderLogic.takeUsersHandler(user, setUsers)} style={{color: 'white', textDecoration: 'none'}} to='/AdminPage'>Страница админа</Link>
              </button>:<div></div>}
            </div>
            <form className="form-inline">
              <SearchComponent setPost={setPost}/>
              <button style={{marginRight: '10px'}} className="btn btn-primary">
                {user === null?<NavLink onClick={() => console.log(user)} className={s.link} to='/LoginPage'>Войти</NavLink>:
                             <Link to='LoginPage' onClick={logOutHandler} className={s.link}>Выйти</Link>}
              </button>
              <button style={{marginRight: '10px'}} className='btn btn-primary profileButton'>
                {user === null?<NavLink className={s.link} to='/RegisterPage'>Зарегистрироваться</NavLink>:
                             <Link onClick={() => HeaderLogic.myPageHandler(user, setMyPageInfo)} to='/MyPage' className={s.link}>Мой профиль</Link>}
              </button>
            </form>
          </nav>
        </div>
    )
}

export default Header
