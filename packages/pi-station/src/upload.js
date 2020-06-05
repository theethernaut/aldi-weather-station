const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const cron = require('node-cron');
const capture = require('./capture')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = '../credentials/token.json';
const imageIdConst = '1gcZsLX0CxuG8_it0Tu9BrdPdthFAk_Z1';
const videoIdConst = '1cNRm7YX8lh2tmp1SPG90V0buhAUZEL7n';

const IMAGE_TIME_MINUTES = 5;
const VIDEO_TIME_MINUTES = 13;

function startImageJob() {
  //Take Image in 5 minutes
  cron.schedule(`*/${IMAGE_TIME_MINUTES} * * * *`, function() {
    console.log("---------------------");
    console.log("Running Cron Job = IMAGE");

    takeAndUploadImage()
  });
}

function startVideoJob() {
  //Take Video
  cron.schedule(`*/${VIDEO_TIME_MINUTES} * * * *`, function() {
      console.log("---------------------")
      console.log("Running Cron Job = VIDEO");

    takeAndUploadVideo()
  });
}

function takeAndUploadImage() {
  capture.captureImage()

  console.log("Updating Image with Cron Job");

  // Load client secrets from a local file.
  fs.readFile('../credentials/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    //authorize(JSON.parse(content), uploadFileVideo); //FOR UPLOADS.
    authorizeImage(JSON.parse(content), updateImage); //FOR UPDATES.
  });
}

function takeAndUploadVideo() {
  capture.captureVideo()

    console.log("Updating Video with Cron Job");

    // Load client secrets from a local file.
    fs.readFile('../credentials/credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.
      //authorize(JSON.parse(content), uploadFileVideo); //FOR UPLOADS.
      authorizeVideo(JSON.parse(content), updateVideo); //FOR UPDATES.
    });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorizeImage(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    //callback(oAuth2Client); //FOR UPLOADS.
    callback(oAuth2Client, imageIdConst); //FOR UPDATES.
  });
}

function authorizeVideo(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    //callback(oAuth2Client); //FOR UPLOADS.
    callback(oAuth2Client, videoIdConst); //FOR UPDATES.
  });
}

//Update the image file in Aldi folder.
function updateImage(auth, fileId) {
  const drive = google.drive({ version: 'v3', auth });
  var fileMetadata = {
      'name': 'captureImage.jpg'
  };
  var media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream('../output/captureImage.jpg')
  };
  drive.files.update({
      resource: fileMetadata,
      media: media,
      fileId: fileId,
      addParents:'1qvTlW1MHkeS_Pstvo9uZURAvDq7s9hpW'
  }, function (err, res) {
        if (err) {
            // Handle error
            console.log(err);
        } else {
            console.log('Updated Image Success ', res.data);
        }
    });
}

//Update the video file in Aldi folder.
function updateVideo(auth, fileId) {
  const drive = google.drive({ version: 'v3', auth });
  var fileMetadata = {
      'name': 'captureVideo.avi'
  };
  var media = {
      mimeType: 'video/avi',
      uploadType:'resumable',
      body: fs.createReadStream('../output/captureVideo.avi')
  };
  drive.files.update({
      resource: fileMetadata,
      media: media,
      fileId: fileId,
      addParents:'1qvTlW1MHkeS_Pstvo9uZURAvDq7s9hpW'
  }, function (err, res) {
        if (err) {
            // Handle error
            console.log(err);
        } else {
            console.log('Updated Video Success ', res.data);
        }
    });
}

//Verify access with token.json
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

//Upload file image to Aldi folder.
function uploadFileImage(auth) {
    const drive = google.drive({ version: 'v3', auth });
    var fileMetadata = {
        'name': 'captureImage.jpg',
        parents:['1qvTlW1MHkeS_Pstvo9uZURAvDq7s9hpW']
    };
    var media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream('../output/captureImage.jpg')
    };
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, res) {
        if (err) {
            // Handle error
            console.log(err);
        } else {
            console.log('File Id: ', res.data);
        }
    });
}

//Upload file video to Aldi folder.
function uploadFileVideo(auth) {
    const drive = google.drive({ version: 'v3', auth });
    var fileMetadata = {
        'name': 'captureVideo.avi',
        parents:['1qvTlW1MHkeS_Pstvo9uZURAvDq7s9hpW']
    };
    var media = {
        mimeType: 'video/avi',
        uploadType:'resumable',
        body: fs.createReadStream('../output/captureVideo.avi')
    };
    drive.files.create({
        resource: fileMetadata,
        media:media,
        fields: 'id'
    }, function (err, res) {
        if (err) {
            // Handle error
            console.log(err);
        } else {
            console.log('File Id: ', res.data);
        }
    });
}

module.exports = {
  startImageJob,
  startVideoJob
}


