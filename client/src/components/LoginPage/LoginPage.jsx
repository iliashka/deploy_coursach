import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import s from '../Header/Header.module.css';
import axios from "axios";
import qs from 'qs'
import FaceBookAuth from 'react-facebook-auth'
import VkAuth from "react-vk-auth";
import Modal from '../Modal/Modal';

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
          return (
            <Modal name={res.data.data.login} text={res.data.message}/>
          )
        }, (error) => {
          console.log(error)
        })
    }
    const MyFacebookButton = ({ onClick }) => (
      <button type='button' className='btn btn-primary fb' onClick={onClick}>
        <Link to='/HomePage' className={s.link}><i class="bi bi-facebook"></i></Link>
      </button>
    );
    const handleVkResponse = (data) => {
      if (data.status === 'connected'){
        axios.post('api/facebookAuth', qs.stringify({
          id: data.session.user.id,
          email: 'vk@user',
          login: `${data.session.user.first_name} ${data.session.user.last_name}`,
          role: 'user',
          password: data.session.user.href
        }))
        .then((res) => {
          setAuthUser(res.data.user)
          setTags(res.data.tags.map((e) => e.tagBody))
        })
      }
    }
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
          <form >
            <div className="form-group">
              <label>Введите Email</label>
              <input onChange={(e) => setPreUser(preUser => ({...preUser, email: e.target.value}))} type="email" id="validationDefaultEmail" className="form-control"  aria-describedby="emailHelp" placeholder="Email"></input>
            </div>
            <div className="form-group">
              <label>Введите пароль</label>
              <input onChange={(e) => setPreUser(preUser => ({...preUser, password: e.target.value}))} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>

            <button onClick={loginHandler} data-bs-toggle="modal" data-bs-target="#exampleModal" type='button' className="btn btn-primary" style={{marginRight: '10px'}}>Войти</button>
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{authUser && authUser.login}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Вы вошли в систему!
                    </div>
                    <div class="modal-footer">
                    <button onClick={() => document.location.href = '/HomePage'} type="button" data-bs-dismiss="modal" class="btn btn-primary">Познать Истнину</button>
                    </div>
                    </div>
                </div>
            </div>
            <button style={{marginRight: '10px'}} className='btn btn-primary'>
              <NavLink className={s.link} to='/RegisterPage'>Зарегистрироваться</NavLink>
            </button>
          </form>
          <div className='mt-4 df'>
            <FaceBookAuth
            appId="148194100501720"
            callback={authenticate}
            component={MyFacebookButton}
            />
            <Link to='/HomePage' className={s.link}><VkAuth
            className='btn btn-primary fb ml-2'
            apiId='7795032'
            callback={handleVkResponse}
            >VK</VkAuth></Link>
          </div>
          <div className='mt-4'>
            <Link to='/Privacy'>Политика конфиденциальности</Link>
          </div>
        </div>
    )
}

export default LoginPage
