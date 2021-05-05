import './App.css';
import Post from './Post';

function App() {
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
        <Post />
        <Post />
        <Post />

      </main>
    </div>
  );
}

export default App;
