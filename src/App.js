import './App.css';

function App() {
  return (
    <div className="App">
        <h2 className='header'>MusicMerge</h2>
        <p>
          A tool for converting spotify playlists to!
        </p>
        <div className='input-container'>
          <input className='spotify-input' type='text' placeholder='Spotify Playlist URL' />
          <button className='convert-button'>Convert</button>
        </div>

    </div>
  );
}

export default App;
