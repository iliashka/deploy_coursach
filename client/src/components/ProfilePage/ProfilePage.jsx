import React from 'react'
import ProfileInfo from './ProfileInfo'

function ProfilePage({profileInfo, lang}) {
    return (
        <div>
            <ProfileInfo lang={lang} profileInfo={profileInfo} />
        </div>
    )
}

export default ProfilePage
