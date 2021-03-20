import axios from 'axios';
import qs from 'qs'

const loginHandler = (e, preUser, setAuthUser, setTags) => {
    e.preventDefault()
    axios.post('api/login', qs.stringify(preUser))
      .then((res) => { 
        localStorage.setItem("user", JSON.stringify(res.data.data))
        setAuthUser(res.data.data)
        setTags(res.data.tags.map((e) => e.tagBody))
      }, (error) => {
        console.log(error)
      })
  }

const handleVkResponse = (data, setAuthUser, setTags) => {
    if (data.status === 'connected'){
      axios.post('api/facebookAuth', qs.stringify({
        id: data.session.user.id,
        email: 'vk@user',
        login: `${data.session.user.first_name} ${data.session.user.last_name}`,
        role: 'user',
        password: data.session.user.href
      }))
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user))
        setAuthUser(res.data.user)
        setTags(res.data.tags.map((e) => e.tagBody))
      })
    }
}  

const authenticate = (response, setAuthUser, setTags) => {
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
}

const LoginLogic = {
    loginHandler, 
    handleVkResponse,
    authenticate
}

export default LoginLogic 