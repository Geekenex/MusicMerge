import { useRef, useState } from 'react';
import './App.css';
import PlaylistOut from './PlaylistOut.js';

function App() {
  const playlistURL = useRef('');
  const [validURL, setValidURL] = useState(true);
  const [componentKey, setComponentKey] = useState(0)
  const spotifyString = "https://open.spotify.com/playlist/";

  function handleURLInput(e){
    console.log(playlistURL.current.value);

    if (playlistURL.current.value.startsWith(spotifyString) && playlistURL.current.value !== spotifyString){
      console.log("do a url request");
      setValidURL(true);
    }
    else {
      console.log("throw an error");
      setValidURL(false);
    }

    setComponentKey(prevKey => prevKey + 1);
  }

  return (
    <div className="App">
        <h2 className='header'>
          MusicMerge
          <span></span> {}
        </h2>
        <div className='background'>
        <p className='description'>  
          A tool for converting spotify playlists to youtube playlists.
        </p>
        <div className='input-container'>
          <input className='playlist-input' type='text' ref={playlistURL} placeholder='Spotify Playlist URL' />
          <button className='convert-button' onClick={handleURLInput}>Convert</button>
        </div>
        {validURL ? 
          <PlaylistOut key={componentKey} url={playlistURL.current.value} />
        : <p className='playlist-fail'>Please enter a valid playlist URL</p> 
        }
    </div>
    </div>
  );
}

export default App;