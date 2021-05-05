import React from 'react'
import './Post.css'
import { Avatar } from '@material-ui/core'

function Post({username, caption, imageUrl}) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                  className="post__avatar"
                  alt={username}
                  src="some_url.jgp"
                />
                <h3>{username}</h3>
            </div>

            <img
                className="post__image"
                src={imageUrl}
                alt="Some pic"
            />

            <div className="post__text">
                <p><strong>{username}:</strong> {caption}</p>
                
            </div>
        </div>
    )
}

export default Post
