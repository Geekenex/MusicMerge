import requests
import base64


def gettoken():
  client_id = 'REPLACED'
  client_secret = '352869543257429094e480273bf80f18'

  auth_url = 'https://accounts.spotify.com/api/token'
  auth_headers = {
      'Authorization': 'Basic ' + base64.b64encode((f'{client_id}:{client_secret}').encode('utf-8')).decode('utf-8')
  }
  auth_data = {
      'grant_type': 'client_credentials'
  }

  auth_response = requests.post(auth_url, headers=auth_headers, data=auth_data)

  if auth_response.status_code == 200:
      token = auth_response.json().get('access_token')
      token_type = auth_response.json().get('token_type')
      expires = auth_response.json().get('expires_in')
      print("Access token:", token)
      print("token_type:", token_type)
      #print("expires", expires)
  else:
      print("Failed to obtain access token: ", auth_response.status_code)
  return auth_response



def getplaylist(urlplaylist, authresponse= gettoken()):
  token = authresponse.json().get('access_token')
  token_type = authresponse.json().get('token_type')
  authorization = token_type + " " + token
  urlplaylist = urlplaylist.split("/")
  urlplaylistID = urlplaylist[len(urlplaylist)-1]
  urlplaylistrequest = "https://api.spotify.com/v1/playlists/"+urlplaylistID
 
  headers = {
      "Authorization": authorization
  }

  response = requests.get(urlplaylistrequest, headers=headers)

  if response.status_code == 200:
      data = response.json()
      print(data)
  else:
      print("Request failed with status code:", response.status_code)




print(getplaylist("https://open.spotify.com/playlist/0ZrdiFRWOifoWKKK2cqkeq?si=0f5a212bbd2d46b5"))