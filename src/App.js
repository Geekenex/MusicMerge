import './App.css';

function App() {
  return (
    <div className="App">
        <h2 className='header'>MusicMerger</h2>
        <p className='description'>
          A tool for converting spotify playlists to youtube playlists!
        </p>
        <div className='input-container'>
          <input className='spotify-input' type='text' placeholder='Spotify Playlist URL' />
          <button className='convert-button'>Convert</button>
        </div>

    </div>
  );
}

export default App;
