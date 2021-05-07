import React from 'react'
import './Post.css'
import { Avatar, IconButton } from '@material-ui/core'
import { db } from './firebase';
import firebase from 'firebase'
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';

function Post({ postId, user, username, caption, imageUrl }) {
    const [comments, setComments] = React.useState([]);
    const [newcomment, setNewComment] = React.useState("");

    React.useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                // console.log('comments', snapshot.docs.map(doc => doc.data()))
                setComments(snapshot.docs.map(doc => ({'id': doc.id, 'data': doc.data()})));
            });
        }
        return () => {
            unsubscribe();
        }
    }, [postId])

    const handleNewComment = (e) => {
        setNewComment(e.target.value);
    }

    const postNewComment = function(e) {
        e.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            username: user.displayName,
            comment: newcomment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setNewComment("")
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                  className="post__avatar"
                  alt={username}
                  src="some_url.jpg"
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

            <div className="post__comments">
                {
                comments.map(({id, data}) => (
                    <p key={id}><strong>{data.username}:</strong> {data.comment}</p>
                ))
                }
            </div>

            {!!user && <form className="post__commentBox">
                <IconButton>
                    <SentimentSatisfiedOutlinedIcon />
                </IconButton>

                <input 
                    className="post__commentBox-input" 
                    type="text" 
                    placeholder="Add a comment"
                    value={newcomment}
                    onChange={handleNewComment}
                />

                <button
                    className="post__commentBox-button"
                    type="submit" 
                    disabled={!newcomment} 
                    onClick={postNewComment}
                >
                    Post
                </button>
            </form>
            }

        </div>
    )
}

export default Post
