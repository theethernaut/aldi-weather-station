const fs = require('fs');
const {google} = require('googleapis');
const cron = require('node-cron');
const capture = require('./capture')
const storage = require('node-persist');

//const videoIdConst = '1cNRm7YX8lh2tmp1SPG90V0buhAUZEL7n';
const TOKEN_PATH = '../credentials/token.json'
const VIDEO_TIME_MINUTES = 13;
let videoIdConst = await storage.getItem('videoId')
console.log('videoId',videoId)


function startVideoJob() {
  //Take Video
  cron.schedule(`*/${VIDEO_TIME_MINUTES} * * * *`, function() {
      console.log("---------------------")
      console.log("Running Cron Job = VIDEO");
      console.log('videoId',videoId)
    takeAndUploadVideo()
  });
}

function takeAndUploadVideo() {
  capture.captureVideo()

    console.log("Updating Video with Cron Job");

    // Load client secrets from a local file.
    fs.readFile('../credentials/credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.
      authorizeVideo(JSON.parse(content), updateVideo); //FOR UPDATES.
    });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

function authorizeVideo(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
    //callback(oAuth2Client); //FOR UPLOADS.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return console.log('Please run npm setup first to get the TOKEN')
      oAuth2Client.setCredentials(JSON.parse(token))
      callback(oAuth2Client, videoIdConst) //FOR UPDATES.
    })
}

//Update the video file in Aldi folder.
function updateVideo(auth, videoId) {
  const drive = google.drive({ version: 'v3', auth });
  var fileMetadata = {
      'name': 'captureVideo.avi'
  };
  var media = {
      mimeType: 'video/avi',
      uploadType:'resumable',
      body: fs.createReadStream('../scripts/output/captureVideo.avi')
  };
  drive.files.update({
      resource: fileMetadata,
      media: media,
      fileId: videoId
      //addParents:'1qvTlW1MHkeS_Pstvo9uZURAvDq7s9hpW'
  }, function (err, res) {
        if (err) {
            // Handle error
            console.log(err);
        } else {
            console.log('Updated Video Success ', res.data);
        }
    });
}

module.exports = {
  startVideoJob
}


