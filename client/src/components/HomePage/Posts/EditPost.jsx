import React from 'react'
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import PostsLogic from './PostsLogic';

function EditPost({ editPost, value, setValue }) {
    const [selectedTab, setSelectedTab] = React.useState("write");
    const [preEditPost, setPreEditPost] = React.useState({
        genre: editPost && editPost.genre,
        postName: editPost && editPost.postName,
        summary: editPost && editPost.summary,
        id: editPost && editPost._id,
        post: editPost && editPost.post
    })
    console.log(preEditPost)

    return (
        <div>
            <div className="card border-secondary mb-3" style={{ maxWidth: '80%', margin: 'auto', marginTop: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="card-header">
                    <h3 style={{ marginLeft: '1rem' }}>Автор: {editPost && editPost.login}</h3>
                    <div style={{display: 'flex'}}>
                        <h3 style={{ marginRight: '15px' }}>Жанр:</h3>
                        <select onChange={(e) => setPreEditPost(preEditPost => ({ ...preEditPost, genre: e.target.value }))} className='form-select'>
                            <option value="Эротика">Эротика</option>
                            <option value="Фантастика">Фантастика</option>
                            <option value="Роман">Роман</option>
                        </select>
                    </div>
                </div>
                <div className="card-body text-dark">
                    <div>
                        <label><h5 className='card-text'>Название произведения:</h5></label>
                        <input defaultValue={editPost && editPost.postName} 
                               onChange={(e) => setPreEditPost(preEditPost => ({ ...preEditPost, postName: e.target.value }))} 
                               className="form-control" type="text" />
                    </div><br />
                    <div>
                        <label><h5 className='card-text'>Краткое описане:</h5></label>
                        <input defaultValue={editPost && editPost.summary}
                               onChange={(e) => setPreEditPost(preEditPost => ({ ...preEditPost, summary: e.target.value }))} 
                               className="form-control" type="text" />
                    </div><br />
                    <div className="form-group green-border-focus">
                        <label><h5 className='card-text'>Ваше Произведение:</h5></label>
                                  <ReactMde
                                    value={value}
                                    onChange={setValue}
                                    selectedTab={selectedTab}
                                    onTabChange={setSelectedTab}
                                    generateMarkdownPreview={(markdown) =>
                                        Promise.resolve(<ReactMarkdown source={markdown} />)
                                    }
                                    childProps={{
                                        writeButton: {
                                            tabIndex: -1
                                        }
                                    }}
                                  />
                    </div>
                </div>
                <button onClick={() => PostsLogic.editPostHandler(value, preEditPost, editPost)} className='btn btn-primary'><h5 style={{marginBottom: '0'}}>Внести Изменения</h5></button>
            </div>
        </div>
    )
}

export default EditPost
