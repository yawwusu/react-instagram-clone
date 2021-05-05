import React from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [posts, setPosts] = React.useState([
    {
      username: "Yaw",
      caption: "Something big",
      imageUrl: "https://www.freecodecamp.org/news/content/images/size/w600/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png",
    },
    {
      username: "Efya",
      caption: "Beautiful is beauty",
      imageUrl: "https://static.posters.cz/image/750/beauty-of-the-nature-3in1-i96709.jpg",
    }
  ])
  
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
          posts.map(({username, caption, imageUrl}) => (
          <Post 
            username={username} 
            caption={caption}
            imageUrl={imageUrl}
          />
          )
        )}
      </main>
    </div>
  );
}

export default App;
