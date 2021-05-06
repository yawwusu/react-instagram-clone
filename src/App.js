import { Button } from '@material-ui/core';
import React from 'react';
import './App.css';
import { auth, db } from './firebase';
import Post from './Post';
import SignUpModal from './SignUpModal'
import SignInModal from './SignInModal'
import ImageUpload from './ImageUpload';

function App() {
  const [posts, setPosts] = React.useState([])
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    // this persists the user
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log('authUser', authUser)
        // user has logged in
        setUser(authUser);
      } else {
        // user has logged out
        setUser(null)
      }
    })
  }, [user])  

  React.useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data(),
      })))
    })
  }, [])

  const handleLogout = () => (
    auth.signOut()
  )

  return (
    <div className="app">
      <header className="app__header">
        <img 
          className="app__headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram text-logo"
        />

        {
          !user ? 
          (
            <div className="app__loginContainer">
              <SignInModal /> 
              <SignUpModal />
            </div>    
          ) : 
          (
              <Button variant="contained" onClick={handleLogout}>
                Log Out
              </Button>
          )
        }
        
      </header>
      <main>
        <h3>Hello Clever Programmers</h3>

        <div className="app__post">
          {
            posts.map(({id, post}) => (
            <Post 
              key={id}
              username={post.username} 
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
            ))
          }
        </div>

        {
          user?.displayName && <ImageUpload user={user} />
        }

      </main>
    </div>
  );
}

export default App;
