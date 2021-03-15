import React from 'react'
import { NavLink } from 'react-router-dom'
import s from '../Header/Header.module.css';
import axios from "axios";
import qs from 'qs'

function RegisterPage() {
    const [user, setUser] = React.useState({
        email: '',
        login: '',
        password: '',
        role: 'user'
    })

    const registerHandler = () => {
        axios.post('singup', qs.stringify(user))
        .then((res) => {
            setUser(0)
            alert(user.login + ', ' + res.data.message)
            if (res.status === 200){
              window.location.href = '/LoginPage'
            }
        }, (error) => {
            console.log(error)
        })
    }

  

    return (
        <div style={{marginTop: '4em'}} className="col-md-6 offset-md-3">
            <h1>Регистрация</h1>
            <br/>
          <form>
            <div className="form-group">
              <label>Email address</label>
              <input onChange={(e) => setUser(user => ({...user, email: e.target.value}))} type="email" id="validationDefaultEmail" className="form-control"  aria-describedby="emailHelp" placeholder="Email"></input>
            </div>
            <div className="form-group">
              <label>Придумайте Логин</label>
              <input onChange={(e) => setUser(user => ({...user, login: e.target.value}))} type="name" className="form-control"  aria-describedby="nameHelp" placeholder="Введите Ваш логин"></input>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input onChange={(e) => setUser(user => ({...user, password: e.target.value}))} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <button onClick={registerHandler} type="button" className="btn btn-primary" style={{marginRight: '10px'}}>Зарегистрироваться</button>
            <button style={{marginRight: '10px'}} className='btn btn-primary'>
              <NavLink className={s.link} to='/LoginPage'>Войти</NavLink>
            </button>
          </form>
        </div>
    )
}

export default RegisterPage