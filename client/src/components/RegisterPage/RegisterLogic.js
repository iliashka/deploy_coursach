import axios from 'axios';
import qs from 'qs'

const registerHandler = (e, user, setUser) => {
    e.preventDefault()
      axios.post('api/singup', qs.stringify(user))
      .then((res) => {
          setUser(0)
          alert(user.login + ', ' + res.data.message)
          if (res.status === 200){
            window.location.href = '/LoginPage'
          }
      }, (error) => {
          alert(error)
      })
  }

const ProfileLogic = {
    registerHandler
}

export default ProfileLogic 