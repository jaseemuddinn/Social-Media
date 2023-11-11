import React from 'react'
import userImg from '../../assests/profile.png'
import './Avatar.scss'

function Avatar({src}) {
  return (
    <div className='Avatar'>
        <img src={src ? src: userImg} alt="User Avatar" />
    </div>
  )
}

export default Avatar