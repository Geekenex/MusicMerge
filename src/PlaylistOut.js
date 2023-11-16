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
    <div className='output-container'>
      {error && <p>Error: {error}</p>}
      {playlistInfo.url ? (
        <>
          <p className='output'>Converted playlist: {playlistInfo.url}</p>
          {playlistInfo.tracks.length > 0 ? (
            <ul>
              {playlistInfo.tracks.map((track, index) => (
                <div key={index} className="trackDiv">
                  <a href={track.url}>
                    <img src={track.image} alt={track.name} className="trackImg"/>
                  </a>
                  <div className="playListInfo">
                    <p><b>Name</b>: {track.name}</p>
                    <p><b>Artist</b>: {track.artist}</p>
                  </div>
                </div>
              ))}
            </ul>
          ) : <div>No tracks found.</div>}
        </>
      ) : (
        <div>Loading converted playlist info...</div>
      )}
    </div>
  );
}

export default PlaylistOut;