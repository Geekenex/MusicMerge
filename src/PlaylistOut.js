import { useEffect, useState } from "react";

function PlaylistOut({ url }) {
  const [playlistInfo, setPlaylistInfo] = useState({url, tracks: [] });
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

        const data = await response.json();
        setPlaylistInfo(data); // Update the state with the fetched data
        console.log(data);
      } catch (error) {
        setError("Failed to load playlist: " + error.message); // Set error message
        console.error("ERROR", error);
      }
    }

    apiCall();
  }, [url]);

  if(Object.keys(playlistInfo).length === 0) {
    return <div className='output-container'>Loading converted playlist info...</div>;
  }
  return (
    <div className='output-container'>
      {error && <p>Error: {error}</p>}
      {playlistInfo.url ? (
        <>
          <p className='output'>Converted playlist: {playlistInfo.url}</p>
          {playlistInfo.tracks.length > 0 ? (
            <ul>
              {playlistInfo.tracks.map((track, index) => (
                <li key={index}><img src={track.image} alt={track.name} />Name: {track.name}</li>
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