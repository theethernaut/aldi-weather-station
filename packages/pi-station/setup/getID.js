const fs = require('fs')
const readline = require('readline')
const {google} = require('googleapis')
const {imageId, videoId, readToken} = require('./setup') 

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive']
const TOKEN_PATH = '../credentials/token.json'
let imgId = imageId
console.log('imagenID : ',imgId)
let vidId = videoId
console.log('vidId ',vidId)

readTokenSetup();
readTokenGetId();

function readTokenGetId() {
    fs.readFile('../credentials/credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err)
        // Authorize a client with credentials, then call the Google Drive API.
        authorizeImage(JSON.parse(content), getImageIdFunc) //FOR UPDATES.
    })
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

function authorizeImage(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0])

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client) //FOR UPLOADS.
  })
}

//Verify access with token.json
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}


function getImageIdFunc(auth, imgId) {
    const drive = google.drive({ version: 'v3', auth })
    drive.files.get({
      'fileId': imgId
    }, function (err, res) {
      if (err) {
          // Handle error
          console.log(err)
      } else {
        getVideoIdFunc(auth, vidId)
        return res.data.id
      }
    })
  }

  
function getVideoIdFunc(auth, vidId) {
    const drive = google.drive({ version: 'v3', auth })
    drive.files.get({
      'fileId': videoId
    }, function (err, res) {
      if (err) {
          // Handle error
          console.log(err)
      } else {
        return res.data.id
      }
    })
  }

  module.exports = {
      getImageIdFunc,
      getVideoIdFunc
  }