import { useEffect, useState } from "react";

let playlistInfo = {};

function PlaylistOut ({url}) {
    useEffect(() => {
        async function apiCall() {
            // replace this with url
            await fetch('playlistinfo.json'
            ,{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            }
            )
            .then(function(response){
                return response.json();
            })
            .then(function(myJson) {
                playlistInfo = myJson;
                console.log(playlistInfo)
            });
        }
        apiCall();
      }, []);
    return (
        <div className='output-container'>
            <p className='output'>Converted playlist: {url}</p>
            {playlistInfo.tracks ? 
            <ul>
                {
                playlistInfo.tracks
                    .map(track =>
                    <li key={track.data.name}><img src={track.data.imageUrl}></img>Name: {track.data.name}</li>
                    )
                }
            </ul> : null}

        </div>
    );
}


async function showPlaylistData(){

  }
export default PlaylistOut;