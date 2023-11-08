import requests
import json
import get_playlist
import create_playlist
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/convert-playlist', methods=['POST'])
def Convert_Playlist():
    data = request.get_json()
    url = data["url"]
    data = get_playlist.getplaylist(url)
    name = data["name"]
    description = "A playlist converted from Spotify to YouTube. Created by Playlist Converter."
    playlist = create_playlist.create_playlist(name, description)
    res = create_playlist.generate_songs(data["tracks"]["items"], playlist["id"])
    print(playlist)
    resres = f"{{\"url\":\"https://www.youtube.com/playlist?list={playlist['id']}\", \"tracks\": {res}}}"
    return jsonify(resres)


@app.route('/', methods=['GET'])
def index():
    return "200 - We good, server is up."

if __name__ == '__main__':
   #print(Convert_Playlist("https://open.spotify.com/playlist/0pdKwyRMaa136TUouG9il3?si=28638d39de1642c9"))
    app.run(debug=True, port=1234)

