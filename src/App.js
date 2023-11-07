import { useRef, useState } from 'react';
import './App.css';
import PlaylistOut from './PlaylistOut.js';
import axios from 'axios';

function App() {
  const playlistURL = useRef('');
  const [validURL, setValidURL] = useState(false);
  const [componentKey, setComponentKey] = useState(0)
  const [requestCount, setRequestCount] = useState(0);
  const spotifyString = "https://open.spotify.com/playlist/";

  function handleURLInput(e){
    console.log(playlistURL.current.value);

    if (playlistURL.current.value.startsWith(spotifyString) && playlistURL.current.value !== spotifyString){
      console.log("do a url request");
      //call api from PlaylistOut
      setValidURL(true);
      setRequestCount(prevCount => prevCount + 1);
    }
    else {
      console.log("throw an error");
      setValidURL(false);
      setRequestCount(prevCount => prevCount + 1);
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
        : //only show error message if the user has tried to convert a playlist
          requestCount > 0 ? <p className='playlist-fail'>Please enter a valid playlist URL</p> : 
          null
        }
    </div>
    </div>
  );
}

export default App;