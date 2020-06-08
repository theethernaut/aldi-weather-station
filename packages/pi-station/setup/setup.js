const fs = require('fs')
const readline = require('readline')
const {google} = require('googleapis')
const capture = require('./capture')
const storage = require('node-persist');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive']
const TOKEN_PATH = '../credentials/token.json'
const IDS_PATH = './IDS.json'
let imageId
let videoId
capture.captureImage()
capture.captureVideo()


if (!fs.existsSync(TOKEN_PATH)) readToken()
function readToken() {
  fs.readFile('../credentials/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err)
    // Authorize a client with credentials, then call the Google Drive API.
    authorizeImage(JSON.parse(content), uploadFileImage) //FOR UPDATES.
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

//Upload image file.
function uploadFileImage(auth) {
    const drive = google.drive({ version: 'v3', auth })
    var fileMetadata = {
        'name': 'captureImage.jpg'
        //parents:['1qvTlW1MHkeS_Pstvo9uZURAvDq7s9hpW'] //ID OF FOLDER 
    }
    var media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream('../scripts/output/captureImage.jpg')
    }
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, res) {
        if (err) {
            // Handle error
            console.log(err)
        } else {
            console.log('File Id: ', res.data.id)
            imageId = res.data.id
            await storage.init({dir: './IDS.json'});
            await storage.setItem('imageId',imageId)
            console.log(await storage.getItem('imageId')); 
            uploadFileVideo(auth)
        }
    })
}

//Upload video file.
function uploadFileVideo(auth) {
    const drive = google.drive({ version: 'v3', auth })
    var fileMetadata = {
        'name': 'captureVideo.avi'
        //parents:['1qvTlW1MHkeS_Pstvo9uZURAvDq7s9hpW']
    }
    var media = {
        mimeType: 'video/avi',
        uploadType:'resumable',
        body: fs.createReadStream('../scripts/output/captureVideo.avi')
    }
    drive.files.create({
        resource: fileMetadata,
        media:media,
        fields: 'id'
    }, function (err, res) {
        if (err) {
            // Handle error
            console.log(err)
        } else {
            console.log('File Id: ', res.data.id)
            videoId = res.data.id
            await storage.init({dir: './IDS.json'});
            await storage.setItem('imageId',imageId)
            console.log(await storage.getItem('imageId')); 
        }
    })
}