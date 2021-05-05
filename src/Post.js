import React from 'react'
import './Post.css'

function Post() {
    return (
        <div className="post">
            <h3>Username</h3>

            <img
                classname="post__image"
                src="picture.url"
                alt="Some pic"
            />

            <h4 className="post__text">Some text</h4>
        </div>
    )
}

export default Post
