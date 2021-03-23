import React from 'react'
import PostsList from './PostsList';
import HeaderLogic from '../HeaderLogic'

function SearchComponent({setPost}) {
    const [input, setInput] = React.useState({
        text: ''
    });
    const [postsList, setPostsList] = React.useState();

    const search = async (e) => {
        setInput(input => ({...input, text: e.target.value}));
        await HeaderLogic.postData(input.text, setPostsList)
    }
    
    return (
        <div>
            <input
            className="form-control mr-md-4"
            style={{width: '20em'}}
            type='search'
            key='random1'
            placeholder='Поиск'
            onChange={search}/>
            <PostsList setPostsList={setPostsList} setPost={setPost} postsList={postsList}/>
        </div>
    )
}

export default SearchComponent
