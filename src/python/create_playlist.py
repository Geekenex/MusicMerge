import google.oauth2.credentials
import googleapiclient.discovery
import googleapiclient.errors
import google.auth.transport.requests
import json

googleCreds = json.loads("google-credentials.json")

SERVICE_ACCOUNT_FILE = 'service_account.json'
SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl']
USER_EMAIL = 'playlist.converter0000@gmail.com' 

CLIENT_ID = googleCreds["CLIENT-ID"]
CLIENT_SECRET = googleCreds["CLIENT-SECRET"]
REFRESH_TOKEN = googleCreds["REFRESH-TOKEN"]


def get_authenticated_service():
    credentials = google.oauth2.credentials.Credentials(
        None,  # No access token set initially
        refresh_token=REFRESH_TOKEN,
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        token_uri=google.oauth2.credentials._GOOGLE_OAUTH2_TOKEN_ENDPOINT,
    )
    
    request_object = google.auth.transport.requests.Request()
    credentials.refresh(request_object)
    
    return googleapiclient.discovery.build("youtube", "v3", credentials=credentials)

def create_playlist(title, description, privacy_status="public"):
    youtube = get_authenticated_service()

    request = youtube.playlists().insert(
        part="snippet,status",
        body={
            "snippet": {
                "title": title,
                "description": description
            },
            "status": {
                "privacyStatus": privacy_status
            }
        }
    )
    response = request.execute()

    return response

def generate_songs(tracks, playlist_id):
    youtube = get_authenticated_service()
    out = []

    for track in tracks:
        song = track["track"]
        artist = song["artists"][0]["name"]
        name = song["name"]
        query = name + " " + artist
        request = youtube.search().list(
            part="snippet",
            maxResults=1,
            q=query
        )
        response = request.execute()
        video_id = response["items"][0]["id"]["videoId"]
        request = youtube.playlistItems().insert(
            part="snippet",
            body={
                "snippet": {
                    "playlistId": playlist_id,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": video_id
                    }
                }
            }
        )
        response = request.execute()

        # add image, name, artist, and video url to out
        out.append({
            "image": song["album"]["images"][0]["url"],
            "name": name,
            "artist": artist,
            "url": "https://www.youtube.com/watch?v=" + video_id
        })

    return out


