import React from 'react';
import './App.css';
import { db } from './firebase';
import Post from './Post';

function App() {
  const [posts, setPosts] = React.useState([])

  React.useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data(),
      })))
    })
  }, [])

  return (
    <div className="app">
      <header className="app__header">
        <img 
          className="app__headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram text-logo"
        />
      </header>
      <main>
        <h3>Hello Clever Programmers</h3>

        {
          posts.map(({id, post}) => (
          <Post 
            key={id}
            username={post.username} 
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
          )
        )}
      </main>
    </div>
  );
}

export default App;
