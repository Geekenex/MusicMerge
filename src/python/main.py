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
    return jsonify(res)


@app.route('/', methods=['GET'])
def index():
    return "200 - We good, server is up."

if __name__ == '__main__':
    app.run(debug=True, port=1234)

