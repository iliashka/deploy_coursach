import axios from 'axios'
import qs from 'qs'
import React from 'react'
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

function EditPost({ editPost }) {
    const [selectedTab, setSelectedTab] = React.useState("write");
    const [value, setValue] = React.useState(editPost && editPost.post)
    const [preEditPost, setPreEditPost] = React.useState({
        genre: editPost && editPost.genre,
        postName: editPost && editPost.postName,
        summary: editPost && editPost.summary,
        id: editPost && editPost._id,
        post: editPost && editPost.post
    })

    const editPostHandler = () => {
        axios.put('api/editPost', qs.stringify({ genre: preEditPost.genre,
                                            id: editPost._id, 
                                            summary: preEditPost.summary, 
                                            postName: preEditPost.postName, 
                                            post: value }))
        .then((res)=> {
            alert(res.data.message)
        })
    }

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
                        <textarea defaultValue={editPost && editPost.post} 
                                  onChange={(e) => setPreEditPost(preEditPost => ({ ...preEditPost, post: e.target.value }))} 
                                  className="form-control" id="exampleFormControlTextarea5" rows="5"></textarea>
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
                <button onClick={editPostHandler} className='btn btn-primary'><h5 style={{marginBottom: '0'}}>Внести Изменения</h5></button>
            </div>
        </div>
    )
}

export default EditPost
