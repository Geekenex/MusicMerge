import requests
import json

def get_tokens(client_id, client_secret, redirect_uri, auth_code):
    token_url = "https://oauth2.googleapis.com/token"
    
    payload = {
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": redirect_uri,
        "code": auth_code,
        "grant_type": "authorization_code"
    }
    
    response = requests.post(token_url, data=payload)
    
    if response.status_code == 200:
        tokens = response.json()
        return tokens
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return None


with open("google-credentials.json", 'r') as file:
    googleCreds = json.load(file)
YOUR_CLIENT_ID = googleCreds["CLIENT-ID"]
YOUR_CLIENT_SECRET = googleCreds["CLIENT-SECRET"]
YOUR_REDIRECT_URI = googleCreds["REDIRECT-URI"]
YOUR_AUTH_CODE = googleCreds["AUTH-CODE"]

tokens = get_tokens(YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, YOUR_REDIRECT_URI, YOUR_AUTH_CODE)
if tokens:
    print("Access Token:", tokens["access_token"])
    print("Refresh Token:", tokens["refresh_token"])
