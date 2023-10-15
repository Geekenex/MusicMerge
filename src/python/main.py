import requests
import json
import get_playlist
import create_playlist



data = get_playlist.getplaylist("https://open.spotify.com/playlist/1hW4IgEQykevDf4lkDKF1B?si=e4a315a631ff4aa8")

name = data["name"]
description = "A playlist converted from Spotify to YouTube. Created by Playlist Converter."
playlist = create_playlist.create_playlist(name, description)

res = create_playlist.generate_songs(data["tracks"]["items"], playlist["id"])

print(json.dumps(res, indent=4))

