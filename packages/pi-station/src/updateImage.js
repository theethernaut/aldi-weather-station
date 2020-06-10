const fs = require("fs");
const { google } = require("googleapis");
const cron = require("node-cron");
const capture = require("./capture");
const storage = require("node-persist");

const TOKEN_PATH = __dirname + "/../credentials/token.json";
const CREDENTIALS_PATH = __dirname + "/../credentials/credentials.json";
//const IMAGE_TIME_MINUTES = 5
const IMAGE_TIME_MINUTES = 10;
let imgId = getImageId().then(function (result) {
  imgId = result;
});
let imageId;

async function getImageId() {
  await storage.init({ dir: __dirname + "/../IDS" });
  let id = await storage.getItem("imageId");
  return id;
}

function startImageJob() {
  //Take Image in 5 minutes
  cron.schedule(`*/${IMAGE_TIME_MINUTES} * * * * *`, function () {
    console.log("---------------------");
    console.log("Running Cron Job = IMAGE");

    takeAndUploadImage();
  });
}

function takeAndUploadImage() {
  capture.captureImage();

  console.log("Updating Image with Cron Job");

  // Load client secrets from a local file.
  fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Drive API.
    //authorize(JSON.parse(content), uploadFileVideo) //FOR UPLOADS.
    authorizeImage(JSON.parse(content), updateImage); //FOR UPDATES.
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

function authorizeImage(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return console.log("Please run node setup first to get the TOKEN");
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, imageId); //FOR UPDATES.
  });
}

//Update the image file in Aldi folder.
function updateImage(auth, imageId) {
  const drive = google.drive({ version: "v3", auth });
  var fileMetadata = {
    name: "captureImage.jpg",
  };
  var media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream("../output/captureImage.jpg"),
  };
  imageId = imgId;
  drive.files.update(
    {
      resource: fileMetadata,
      media: media,
      fileId: imageId
      //addParents:'1qvTlW1MHkeS_Pstvo9uZURAvDq7s9hpW'
    },
    function (err, res) {
      if (err) {
        // Handle error
        console.log(err);
      } else {
        console.log("Updated Image Success ", res.data);
        getURI(auth, imageId);
      }
    }
  );
}

function getURI(auth, imageId) {
  const drive = google.drive({ version: "v3", auth });
  drive.files.get(
    {
      fileId: imageId, //id of the file you are looking for
      alt: "media",
    },
    function (err, response) {
      if (err) {
        console.log(err);

        //handle the error
      } else {
        var imageType = response.headers["content-type"];
        console.log(imageType)
        console.log(response)
        //res.send(dataURI)
      }
    }
  );
}

module.exports = {
  startImageJob
}
