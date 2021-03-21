import React from 'react'
import Tags from '../NewPostPage/Tags';
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import NewPostLogic from '../NewPostPage/NewPostLogic'

function NewAdminPostPage({ user, tags, setTags }) {
    const [preTags, setPreTags] = React.useState()
    const [value, setValue] = React.useState("")
    const [selectedTab, setSelectedTab] = React.useState("write");
    const [newPost, setNewPost] = React.useState({
        login: user.login,
        post: '',
        postName: '',
        genre: 'Эротика',
        summary: '',
    })

    return (
        <div className="card border-secondary mb-3 newPostCard" style={{ maxWidth: '60%', margin: 'auto', marginTop: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} className="card-header">
                <h3 className='card-text'>Автор: {user.login}</h3>
                <div style={{ display: 'flex' }} >
                    <h3 style={{ marginRight: '1rem' }}>Жанр:</h3>
                    <select onChange={(e) => setNewPost(newPost => ({ ...newPost, genre: e.target.value }))} className='form-select'>
                        <option value="Эротика">Эротика</option>
                        <option value="Фантастика">Фантастика</option>
                        <option value="Роман">Роман</option>
                    </select>
                </div>
            </div>
            <div className="card-body text-dark">
                <div>
                    <label><h5 className='card-text'>Название произведения:</h5></label>
                    <input onChange={(e) => setNewPost(newPost => ({ ...newPost, postName: e.target.value }))} className="form-control" type="text" />
                </div><br />
                <div>
                    <label><h5 className='card-text'>Краткое описане:</h5></label>
                    <input onChange={(e) => setNewPost(newPost => ({ ...newPost, summary: e.target.value }))} className="form-control" type="text" />
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
                <div className="form-group green-border-focus">
                    <label><h5 className='card-text'>Тэги:</h5></label>
                    <Tags setPreTags={setPreTags} setTags={setTags} tags={tags} />

                </div>
            </div>
            <button onClick={() => NewPostLogic.newPostHandler(preTags, value, newPost, user)} data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-primary'><h5>Опубликовать</h5></button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{user && user.login}</h5>
                    </div>
                    <div class="modal-body">
                        <h6>Твоя "Прелесть" ждёт тебя на главной странице!</h6>
                    </div>
                    <div class="modal-footer">
                    <button onClick={() => document.location.href = '/HomePage'} type="button" data-bs-dismiss="modal" class="btn btn-primary">Вернуться в Мордор</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewAdminPostPage
