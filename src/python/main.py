import requests
import json
import get_playlist
import create_playlist



URL = "https://api.musicapi.com/public/search"


payload = json.dumps({
  "track": "Bezos I",
  "type": "track",
  "sources": [
    "spotify",
    "youtube",
  ]
})
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Token 9612173b-0afb-45ce-aa05-4dc065481d94'
}

response = requests.request("POST", URL, headers=headers, data=payload)

print(response.text)