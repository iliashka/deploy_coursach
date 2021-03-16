import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import s from '../Header/Header.module.css';
import axios from "axios";
import qs from 'qs'

function LoginPage({authUser, setAuthUser, setTags}) {
    const [preUser, setPreUser] = React.useState({
      email: '',
      password: ''
    })

    const loginHandler = () => {
      axios.post('api/login', qs.stringify(preUser))
        .then((res) => { 
          localStorage.setItem("user", JSON.stringify(res.data.data))
          setAuthUser(res.data.data)
          setTags(res.data.tags.map((e) => e.tagBody))
          alert(res.data.data.login + ' ' + res.data.message)
        }, (error) => {
          console.log(error)
        })
    }

    return (
        <div style={{marginTop: '4em'}} className="col-md-6 offset-md-3">
          <h1>Логин</h1>
          <br/>
          <form>
            <div className="form-group">
              <label>Введите Email</label>
              <input onChange={(e) => setPreUser(preUser => ({...preUser, email: e.target.value}))} type="email" className="form-control"  aria-describedby="emailHelp" placeholder="Email"></input>
            </div>
            <div className="form-group">
              <label>Введите пароль</label>
              <input onChange={(e) => setPreUser(preUser => ({...preUser, password: e.target.value}))} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <button onClick={loginHandler} type='button' className="btn btn-primary" style={{marginRight: '10px'}}><Link style={{textDecoration: 'none', color: 'white'}} to='/HomePage'>Войти</Link></button>
            <button style={{marginRight: '10px'}} className='btn btn-primary'>
              <NavLink className={s.link} to='/RegisterPage'>Зарегистрироваться</NavLink>
            </button>
          </form>
        </div>
    )
}

export default LoginPage
