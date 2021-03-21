import axios from 'axios';
import QueryString from 'qs';

const searchByGenre = (genre, setPosts) => {
    axios.post('api/searchByGenre', QueryString.stringify({genre: genre}))
      .then((res) => {
        setPosts(res.data.posts)
      })
}

const takeAllPosts = (setPosts) => {
    axios.get('api/posts')
      .then((res) => {
          setPosts(res.data.posts.reverse())
    })
}

const getTags = (setTags) => {
    axios.get('api/tags')
        .then((res) => {
          setTags(res.data.tags.map(e => e.tagBody))
        })
}

const getBestPosts = (setBestPosts) => {
    axios.get('api/bestPosts')
        .then((res) => {
          setBestPosts(res.data.bestPosts)
        })
}


const logic = {
    takeAllPosts,
    searchByGenre,
    getTags,
    getBestPosts
}

export default logic 