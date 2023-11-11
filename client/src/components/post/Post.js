import React from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss'
import postImg from '../../assests/post.jpg'
import {AiOutlineHeart} from 'react-icons/ai'

function Post({post}) {
  return (
    <div className='Post'>
        <div className="heading">
            <Avatar />
            <h4>Jaseem</h4>
        </div>
        <div className="content">
            <img src={postImg} alt="post" />
        </div>
        <div className="footer">
            <div className="like">
            <AiOutlineHeart className='icon'/>
            <h4 className='like-count'>4 likes</h4>
            </div>
            <p className='caption'>This is Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, quae?</p>
            <h6 className='time-ago'>4 hours ago</h6>
        </div>

    </div>
  )
}

export default Post