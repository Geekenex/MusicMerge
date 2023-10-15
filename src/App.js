import { useRef, useState } from 'react';
import './App.css';
import PlaylistOut from './PlaylistOut.js';

function App() {
  const playlistURL = useRef('');
  const [validURL, setValidURL] = useState(true);

  function handleURLInput(e){
    console.log(playlistURL.current.value);

    if (playlistURL.current.value.startsWith("https://open.spotify.com/playlist")){
      console.log("do a url request");
      setValidURL(true);
    }
    else {
      console.log("throw an error");
      setValidURL(false);
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
        {validURL ? 
          <PlaylistOut url={playlistURL.current.value} />
        : <p className='playlist-fail'>Please enter a valid playlist URL</p> 
        }
    </div>
    </div>
  );
}

export default App;