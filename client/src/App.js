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



function App() {
  const [authUser, setAuthUser] = React.useState({
    id: '',
    email: '',
    role: '',
    login: '',
    avatar: ''
  })
  const [users, setUsers] = React.useState()
  const [myPageInfo, setMyPageInfo] = React.useState()
  const [post, setPost] = React.useState()
  const [posts, setPosts] = React.useState()
  const [editPost, setEditPost] = React.useState()
  const [tags, setTags] = React.useState()
  const [profileInfo, setProfileInfo] = React.useState()

  return (
    <div className="App" style={{height: '100%'}}>
      <Header setUsers={setUsers} setPost={setPost} setMyPageInfo={setMyPageInfo} setUser={setAuthUser} user={authUser} />
      <Route path='/NewPostPage' render={() => <NewPostPage 
                                                  setTags={setTags} 
                                                  tags={tags} 
                                                  user={authUser} />} />
      <Route path='/HomePage' render={() =>    <HomePage 
                                                  setProfileInfo={setProfileInfo} 
                                                  setTags={setTags} 
                                                  tags={tags} 
                                                  user={authUser} 
                                                  posts={posts} 
                                                  setPosts={setPosts} 
                                                  setPost={setPost} 
                                                  setAuthUser={setAuthUser} />} />
      <Route path='/LoginPage' render={() =>   <LoginPage 
                                                  setTags={setTags} 
                                                  authUser={authUser} 
                                                  setAuthUser={setAuthUser} />} />
      <Route path='/RegisterPage' render={() => <RegisterPage />} />
      <Route path='/ProfilePage' render={() =>  <ProfilePage profileInfo={profileInfo} />} />
      <Route path='/MyPage' render={() =>       <MyPage 
                                                  setEditPost={setEditPost} 
                                                  setPost={setPost} 
                                                  setUser={setAuthUser} 
                                                  user={authUser} 
                                                  setMyPageInfo={setMyPageInfo} 
                                                  myPageInfo={myPageInfo} />} />
      <Route path='/PostPage' render={() =>     <PostPage 
                                                  user={authUser} 
                                                  setPosts={setPosts} 
                                                  post={post} />} />
      <Route path='/EditPage' render={() =>     <EditPost 
                                                  user={authUser} 
                                                  setEditPost={setEditPost} 
                                                  editPost={editPost} />} />
      <Route path='/AdminPage' render={() =>    <AdminPage 
                                                  setProfileInfo={setProfileInfo} 
                                                  setEditPost={setEditPost} 
                                                  setUsers={setUsers} 
                                                  authUser={authUser} 
                                                  users={users} />} />
      <Route path='/Privacy' render={() =>      <Privacy/>}/>
      <Footer/>
    </div>
  );
}

export default App;
