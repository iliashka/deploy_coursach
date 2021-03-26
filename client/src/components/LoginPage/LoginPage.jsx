import React from 'react'
import { NavLink } from 'react-router-dom'
import s from '../Header/Header.module.css';
import FaceBookAuth from 'react-facebook-auth'
import VkAuth from "react-vk-auth";
import LoginLogic from './LoginLogic'

function LoginPage({authUser, setAuthUser, setTags, lang}) {
    const [preUser, setPreUser] = React.useState({
      email: '',
      password: ''
    })

    const MyFacebookButton = ({ onClick }) => (
      <button type='button' className='btn btn-primary fb' onClick={onClick}>
        Sing In with<i class="bi bi-facebook"></i>
      </button>
    );
    
    return (
        <div style={{marginTop: '4em', marginBottom: '30%'}} className="col-md-6 offset-md-3">
          <h1>{lang===false?`Login`:`Логин`}</h1>
          <br/>
          <form >
            <div className="form-group">
              <label>{lang===false?`Enter Email`:`Введите Email`}</label>
              <input onChange={(e) => setPreUser(preUser => ({...preUser, email: e.target.value}))} type="email" id="validationDefaultEmail" className="form-control"  aria-describedby="emailHelp" placeholder="Email"></input>
            </div>
            <div className="form-group">
              <label>{lang===false?`Enter password`:`Введите пароль`}</label>
              <input onChange={(e) => setPreUser(preUser => ({...preUser, password: e.target.value}))} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <button onClick={(e) => LoginLogic.loginHandler(e, preUser, setAuthUser, setTags)} data-bs-toggle="modal" data-bs-target="#exampleModal" type='button' className="btn btn-primary" style={{marginRight: '10px'}}>{lang===false?`Sing In`:`Войти`}</button>
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{authUser && authUser.login}</h5>
                    </div>
                    <div class="modal-body">
                      {lang===false?`You are logged in!`:`Вы вошли в систему!`}
                    </div>
                    <div class="modal-footer">
                    <button onClick={() => document.location.href = '/HomePage'} type="button" data-bs-dismiss="modal" class="btn btn-primary">{lang===false?`Know the Truth`:`Познать Истину`}</button>
                    </div>
                    </div>
                </div>
            </div>
            <button style={{marginRight: '10px'}} className='btn btn-primary'>
              <NavLink className={s.link} to='/RegisterPage'>{lang===false?`Sing Up`:`Зарегистрироваться`}</NavLink>
            </button>
          </form>
          <div className='mt-4 df'>
            <FaceBookAuth
            appId="148194100501720"
            callback={(response) => LoginLogic.authenticate(response, setTags, setAuthUser)}
            component={MyFacebookButton}
            />
            <VkAuth
            className='btn btn-primary fb ml-2'
            apiId='7795032'
            callback={(data) => LoginLogic.handleVkResponse(data, setTags, setAuthUser)}
            >Sing In with VK</VkAuth>
          </div>
        </div>
    )
}

export default LoginPage
