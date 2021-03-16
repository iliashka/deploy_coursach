import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import s from '../Header/Header.module.css';
import axios from "axios";
import qs from 'qs'
import FaceBookAuth from 'react-facebook-auth'

function LoginPage({authUser, setAuthUser, setTags}) {
    const [preUser, setPreUser] = React.useState({
      email: '',
      password: ''
    })

    const loginHandler = (e) => {
      e.preventDefault()
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
    const MyFacebookButton = ({ onClick }) => (
      <button type='button' className='btn btn-primary' onClick={onClick}>
        <i class="bi bi-facebook"></i> <Link to='/HomePage' className={s.link}>Login with facebook</Link>
      </button>
    );
    const authenticate = (response) => {
      if(response){
        axios.post('api/facebookAuth', qs.stringify({
          id: response.id,
          email: response.email,
          role: 'user',
          login: response.name,
          avatar: response.picture.data.url,
          password: response.accessToken
        }))
        .then((res) => {
          setAuthUser(res.data.user)
          setTags(res.data.tags.map((e) => e.tagBody))
        })
      }else{
        return;
      }
    };
    return (
        <div style={{marginTop: '4em'}} className="col-md-6 offset-md-3">
          <h1>Логин</h1>
          <br/>
          <form onSubmit={loginHandler}>
            <div className="form-group">
              <label>Введите Email</label>
              <input onChange={(e) => setPreUser(preUser => ({...preUser, email: e.target.value}))} type="email" id="validationDefaultEmail" className="form-control"  aria-describedby="emailHelp" placeholder="Email"></input>
            </div>
            <div className="form-group">
              <label>Введите пароль</label>
              <input onChange={(e) => setPreUser(preUser => ({...preUser, password: e.target.value}))} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <button type='button' className="btn btn-primary" style={{marginRight: '10px'}}><Link type='submit' style={{textDecoration: 'none', color: 'white'}} to='/HomePage'>Войти</Link></button>
            <button style={{marginRight: '10px'}} className='btn btn-primary'>
              <NavLink className={s.link} to='/RegisterPage'>Зарегистрироваться</NavLink>
            </button>
          </form>
          <div className='mt-4'>
            <FaceBookAuth
            appId="148194100501720"
            callback={authenticate}
            component={MyFacebookButton}
            />
          </div>
          <div className='mt-4'>
            <Link to='/Privacy'>Политика конфиденциальности</Link>
          </div>
        </div>
    )
}

export default LoginPage
