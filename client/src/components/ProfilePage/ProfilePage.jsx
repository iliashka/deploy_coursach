import React from 'react'
import ProfileInfo from './ProfileInfo'

function ProfilePage({profileInfo}) {
    return (
        <div>
            <ProfileInfo profileInfo={profileInfo} />
        </div>
    )
}

export default ProfilePage
