import requests

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

# Replace these placeholders with your values
YOUR_CLIENT_ID = "REPLACED"
YOUR_CLIENT_SECRET = "REPLACED"
YOUR_REDIRECT_URI = "http://localhost:8080/callback"
YOUR_AUTH_CODE = "4/0AfJohXmMhbWtYATqN-kWvfNiz6kzITpGY_mA64LFPfLIlRiuGD8AjH1IeV4AbTDwegxu0A"

tokens = get_tokens(YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, YOUR_REDIRECT_URI, YOUR_AUTH_CODE)
if tokens:
    print("Access Token:", tokens["access_token"])
    print("Refresh Token:", tokens["refresh_token"])
