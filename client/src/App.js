import React from 'react'
import Header from './components/Header/Header'
import { Route } from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import HomePage from './components/HomePage/HomePage';
import NewPostPage from './components/NewPostPage/NewPostPage';
import ProfilePage from './components/ProfilePage/ProfilePage'
import MyPage from './components/ProfilePage/MyPage';
import PostPage from './components/HomePage/Posts/PostPage';
import EditPost from './components/HomePage/Posts/EditPost';
import AdminPage from './components/AdminPage/AdminPage';
import Privacy from './components/AdminPage/Privacy';
import Footer from './components/Footer/Footer';
import ErrorPage from './components/ErrorPage/ErrorPage';
import NewAdminPostPage from './components/AdminPage/NewAdminPostPage';
import AdminMyPage from './components/AdminPage/AdminMyPage';



function App() {
  const [authUser, setAuthUser] = React.useState({
    id: '',
    email: '',
    role: '',
    login: '',
    avatar: '',
    aboutMe: ''
  })
  
  const [users, setUsers] = React.useState()
  const [myPageInfo, setMyPageInfo] = React.useState()
  const [post, setPost] = React.useState()
  const [posts, setPosts] = React.useState()
  const [editPost, setEditPost] = React.useState()
  const [tags, setTags] = React.useState()
  const [profileInfo, setProfileInfo] = React.useState()
  const [editedUser, setEditedUser] = React.useState()
  const [value, setValue] = React.useState()
  const [lang, setLang] = React.useState()
  return (
    <div className="App" style={{height: '100%'}}>
      <Header setUsers={setUsers} setPost={setPost} setMyPageInfo={setMyPageInfo} setUser={setAuthUser} user={authUser} lang={lang} setLang={setLang} />
      <Route path='/NewPostPage' render={() => <NewPostPage 
                                                  setTags={setTags} 
                                                  tags={tags} 
                                                  user={authUser}
                                                  lang={lang} />} />
      <Route path='/NewAdminPostPage' render={() => <NewAdminPostPage
                                                      user={editedUser}
                                                      tags={tags}
                                                      setTags={setTags}
                                                      lang={lang}
                                                    />} />
      <Route path='/HomePage' render={() =>    <HomePage 
                                                  setProfileInfo={setProfileInfo} 
                                                  setTags={setTags} 
                                                  tags={tags} 
                                                  user={authUser} 
                                                  posts={posts} 
                                                  setPosts={setPosts} 
                                                  setPost={setPost} 
                                                  setAuthUser={setAuthUser}
                                                  lang={lang}
                                                  setLang={setLang} />} />
      <Route path='/LoginPage' render={() =>   <LoginPage 
                                                  setTags={setTags} 
                                                  authUser={authUser} 
                                                  setAuthUser={setAuthUser}
                                                  lang={lang} />} />
      <Route path='/RegisterPage' render={() => <RegisterPage lang={lang} />} />
      <Route path='/ProfilePage' render={() =>  <ProfilePage profileInfo={profileInfo} lang={lang} />} />
      <Route path='/MyPage' render={() =>       <MyPage 
                                                  setEditPost={setEditPost} 
                                                  setPost={setPost} 
                                                  setUser={setAuthUser} 
                                                  user={authUser} 
                                                  setValue={setValue}
                                                  setMyPageInfo={setMyPageInfo} 
                                                  myPageInfo={myPageInfo}
                                                  lang={lang} />} />
      <Route path='/AdminMyPage' render={() =>  <AdminMyPage
                                                  setEditPost={setEditPost} 
                                                  setPost={setPost} 
                                                  setUser={setEditedUser}
                                                  user={editedUser}
                                                  setValue={setValue}
                                                  authUser={authUser}
                                                  setMyPageInfo={setMyPageInfo} 
                                                  myPageInfo={myPageInfo}
                                                  lang={lang}
                                                  />}/>
      <Route path='/PostPage' render={() =>     <PostPage 
                                                  user={authUser} 
                                                  setPosts={setPosts} 
                                                  post={post}
                                                  lang={lang} />} />
      <Route path='/EditPage' render={() =>     <EditPost 
                                                  user={authUser} 
                                                  setEditPost={setEditPost} 
                                                  editPost={editPost}
                                                  setValue={setValue}
                                                  value={value}
                                                  lang={lang} />} />
      <Route path='/AdminPage' render={() =>    <AdminPage 
                                                  setMyPageInfo={setMyPageInfo} 
                                                  setEditPost={setEditPost} 
                                                  setEditedUser={setEditedUser}
                                                  setUsers={setUsers} 
                                                  setValue={setValue}
                                                  authUser={authUser} 
                                                  users={users}
                                                  lang={lang} />} />
      <Route path='/Privacy' render={() =>      <Privacy/>}/>
      <Route path='/Error' render={() =>        <ErrorPage/>}/>
      <Footer lang={lang}/>
    </div>
  );
}

export default App;
