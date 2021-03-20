import React from 'react'
import PostsList from './PostsList';
import HeaderLogic from '../HeaderLogic'

function SearchComponent({setPost}) {
    const [input, setInput] = React.useState('');
    const [postsList, setPostsList] = React.useState();

    React.useEffect(() => {HeaderLogic.postData(input, setPostsList)}, [input]);
    return (
        <div>
            <input
            className="form-control mr-md-4"
            style={{width: '20em'}}
            type='search'
            key='random1'
            placeholder='Поиск'
            onChange={(e) => setInput(e.target.value)}
            onFocus={(e) => setInput(e.target.value)}
            />
            <PostsList setPostsList={setPostsList} setPost={setPost} postsList={postsList}/>
        </div>
    )
}

export default SearchComponent
