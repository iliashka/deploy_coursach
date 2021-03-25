import React from 'react'

function ProfileInfo({ profileInfo, lang }) {
    return (
        <div>
            <div style={{paddingTop: '30px', paddingBottom: '70px' , maxWidth: '80%', margin: 'auto'}}>{profileInfo && 
                <h1>{lang===false?'User page: ':'Страница пользователя: '} {profileInfo.user.login}</h1>
            }</div>
            {profileInfo && profileInfo.posts.map((e, index) => {
                return <div className="card border-secondary mb-3" style={{ maxWidth: '80%', margin: 'auto'}}>
                         <div style={{display: 'flex', justifyContent: 'space-between'}} className="card-header">
                           <h3 style={{marginLeft: '1rem'}}>{lang===false?`Author: `:`Автор: `} {e.login}</h3>
                           <h3 style={{marginRight: '1rem'}}>{lang===false?`Genre: `:`Жанр:`} {e.genre}</h3>
                         </div>
                         <div className="card-body text-dark">
                           <h5 className="card-title">{e.postName}</h5>
                           <h6>{e.summary}</h6>
                         </div>
                       </div>
            })}
        </div>
    )
}

export default ProfileInfo
