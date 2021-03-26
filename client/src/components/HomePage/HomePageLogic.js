import axios from 'axios';
import QueryString from 'qs';

const searchByGenre = (genre, setPosts) => {
    axios.post('api/searchByGenre', QueryString.stringify({genre: genre}))
      .then((res) => {
        setPosts(res.data.posts)
      })
      .catch(err => {
        console.log(err)
        document.location.href = '/Error'
      })
}

const takeAllPosts = (setPosts) => {
    axios.get('api/posts')
      .then((res) => {
          setPosts(res.data.posts.reverse())
    })
    .catch(err => {
      console.log(err)
      document.location.href = '/Error'
    })
}

const getTags = (setTags) => {
    axios.get('api/tags')
        .then((res) => {
          setTags(res.data.tags.map(e => e.tagBody))
        })
        .catch(err => {
          console.log(err)
          document.location.href = '/Error'
        })
}

const getBestPosts = (setPosts) => {
    axios.get('api/bestPosts')
        .then((res) => {
          setPosts(res.data.bestPosts)
        })
        .catch(err => {
          console.log(err)
          document.location.href = '/Error'
        })
}


const logic = {
    takeAllPosts,
    searchByGenre,
    getTags,
    getBestPosts
}

export default logic 