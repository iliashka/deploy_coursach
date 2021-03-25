import React from 'react'
import { NavLink } from 'react-router-dom'
import s from '../Header/Header.module.css';
import RegisterLogic from './RegisterLogic'

function RegisterPage({lang}) {
    const [user, setUser] = React.useState({
        email: '',
        login: '',
        password: '',
        role: 'user'
    })

    return (
        <div style={{marginTop: '4em'}} className="col-md-6 offset-md-3">
            <h1>{lang===false?'Sing Up':'Регистрация'}</h1>
            <br/>
          <form onSubmit={(e) => RegisterLogic.registerHandler(e, user, setUser)}>
            <div className="form-group">
              <label>{lang===false?'Email address':'Ваш Email'}</label>
              <input onChange={(e) => setUser(user => ({...user, email: e.target.value}))} type="email" id="validationDefaultEmail" className="form-control"  aria-describedby="emailHelp" placeholder="Email"></input>
            </div>
            <div className="form-group">
              <label>{lang===false?'Create a username':'Придумайте Логин'}</label>
              <input onChange={(e) => setUser(user => ({...user, login: e.target.value}))} type="name" className="form-control"  aria-describedby="nameHelp" placeholder={lang===false?'Login':'Логин'}></input>
            </div>
            <div className="form-group">
              <label>{lang===false?'Create a password':'Придумайте пароль'}</label>
              <input onChange={(e) => setUser(user => ({...user, password: e.target.value}))} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <button type="submit" className="btn btn-primary" style={{marginRight: '10px'}}>{lang===false?'Sing Up':'Зарегистрироваться'}</button>
            <button style={{marginRight: '10px'}} className='btn btn-primary'>
              <NavLink className={s.link} to='/LoginPage'>{lang===false?'Sing In':'Войти'}</NavLink>
            </button>
          </form>
        </div>
    )
}

export default RegisterPage