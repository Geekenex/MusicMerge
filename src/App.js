import { useRef, useState } from 'react';
import './App.css';

function App() {
  const playlistURL = useRef('');

  function handleURLInput(e){
    console.log(playlistURL.current.value);

    if (playlistURL.current.value.startsWith("https://open.spotify.com/playlist")){
      console.log("do a url request");
    }
    else
      console.log("throw an error");
  }


  return (
    <div className="App">
        <h2 className='header'>MusicMerge</h2>
        <p className='description'>  
          A tool for converting spotify playlists to!
        </p>
        <div className='input-container'>
          <input className='spotify-input' type='text' ref={playlistURL} placeholder='Spotify Playlist URL' />
          <button className='convert-button' onClick={handleURLInput}>Convert</button>
        </div>

    </div>
  );
}

export default App;
