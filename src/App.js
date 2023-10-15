import { useRef, useState } from 'react';
import './App.css';

function App() {
  const playlistURL = useRef('');
  const [playlistInputError, setPlaylistInputError] = useState(false);

  function handleURLInput(e){
    console.log(playlistURL.current.value);

    if (playlistURL.current.value.startsWith("https://open.spotify.com/playlist")){
      console.log("do a url request");
      setPlaylistInputError(false);
    }
    else {
      console.log("throw an error");
      setPlaylistInputError(true);
    }
  }


  return (
    <div className="App">
        <h2 className='header'>MusicMerge</h2>
        <div className='background'>
        <p className='description'>  
          A tool for converting spotify playlists to!
        </p>
        <div className='input-container'>
          <input className='playlist-input' type='text' ref={playlistURL} placeholder='Spotify Playlist URL' />
          <button className='convert-button' onClick={handleURLInput}>Convert</button>
        </div>
        {playlistInputError ? <p className='playlist-fail'>Please enter a valid playlist URL</p> : null}
        
        <div className='output-container'>
          <p className='output'>Link to converted playlist:</p>
        </div>
    </div>
    </div>
  );
}



export default App;
