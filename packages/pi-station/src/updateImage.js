const fs = require('fs')
const {google} = require('googleapis')
const cron = require('node-cron')
const capture = require('./capture')
const storage = require('node-persist');

//const imageIdConst = '1gcZsLX0CxuG8_it0Tu9BrdPdthFAk_Z1'
async function getImageId () {
  return imageIdConst = await  storage.getItem('imageId')
}
const TOKEN_PATH = '../credentials/token.json'
const IMAGE_TIME_MINUTES = 5
console.log('imageId'+getImageId)

function startImageJob() {
  //Take Image in 5 minutes
  cron.schedule(`*/${IMAGE_TIME_MINUTES} * * * *`, function() {
    console.log("---------------------")
    console.log("Running Cron Job = IMAGE")

    takeAndUploadImage()
  })
}

function takeAndUploadImage() {
  capture.captureImage()

  console.log("Updating Image with Cron Job")

  // Load client secrets from a local file.
  fs.readFile('../credentials/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err)
    // Authorize a client with credentials, then call the Google Drive API.
    //authorize(JSON.parse(content), uploadFileVideo) //FOR UPLOADS.
    authorizeImage(JSON.parse(content), updateImage) //FOR UPDATES.
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
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return console.log('Please run npm setup first to get the TOKEN')
        oAuth2Client.setCredentials(JSON.parse(token))
        callback(oAuth2Client, getImageId) //FOR UPDATES.
      })
}

//Update the image file in Aldi folder.
function updateImage(auth, getImageId) {
  const drive = google.drive({ version: 'v3', auth })
  var fileMetadata = {
      'name': 'captureImage.jpg'
  }
  var media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream('../src/output/captureImage.jpg')
  }
  drive.files.update({
      resource: fileMetadata,
      media: media,
      fileId: getImageId
      //addParents:'1qvTlW1MHkeS_Pstvo9uZURAvDq7s9hpW'
  }, function (err, res) {
        if (err) {
            // Handle error
            console.log(err)
        } else {
            console.log('Updated Image Success ', res.data)
        }
    })
}

module.exports = {
  startImageJob
}