import { useEffect, useState } from "react";
import "./playlistOut.css"
function PlaylistOut({ url }) {
  const [playlistInfo, setPlaylistInfo] = useState({ tracks: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    async function apiCall() {
      try {
        const response = await fetch('http://127.0.0.1:1234/convert-playlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: url
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error, status: ${response.status}`);
        }

        let data = await response.json();

       /* if (typeof data === 'string') {
          console.log(data);
          data = JSON.parse(data.replace("'", "\""));
        }
        */
        setPlaylistInfo(data); // Update the state with the fetched data
        console.log(data);
        setError(null);
      } catch (error) {
        setError("Failed to load playlist: " + error.message); // Set error message
        console.error("ERROR", error);
      }
    }

    apiCall();
  }, [url]);


  useEffect(() => {
    //print playlist info to console when updated
    console.log(playlistInfo);
    console.log(playlistInfo.tracks);
    console.log(playlistInfo.url);
    console.log(typeof playlistInfo);
  }, [playlistInfo]);

  return (
    <div>
    <p className='output'>Converted playlist: <a href={playlistInfo.url}>{playlistInfo.url}</a></p>
      {error && <p>Error: {error}</p>}
      {playlistInfo.url ? (
        <>
          {playlistInfo.tracks.length > 0 ? (
            <div className="output-container">
              {playlistInfo.tracks.map((track, index) => (
                <div key={index} className="trackDiv">
                <a href={track.url}>
                  <img src={track.image} alt={track.name} className="trackImg"/>
                  <div className="playListInfo">
                    <p><b>Name</b>: {track.name}</p>
                    <p><b>Artist</b>: {track.artist}</p>
                  </div>  
                </a>
                </div>
              ))}
            </div>
          ) : <div>No tracks found.</div>}
        </>
      ) : (
        <div>Loading converted playlist info...</div>
      )}
    </div>
  );
}

export default PlaylistOut;