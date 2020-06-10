const fs = require("fs");
const { google } = require("googleapis");

const TOKEN_PATH = __dirname + "/credentials/token.json";
const CREDENTIALS_PATH = __dirname + "/credentials/credentials.json";

function main() {
    readCredentials()
}

main();

function readCredentials() {
  // Load client secrets from a local file.
  fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    authorize(JSON.parse(content), downloadImage);
  });
}

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) throw err;
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client); //FOR UPDATES.
  });
}

function downloadImage(auth) {
  const imageId = "0BwwA4oUTeiV1UVNwOHItT0xfa2M";
  var dest = fs.createWriteStream("./output/captureImage.jpg");
  drive.files
    .get({
      fileId: imageId,
      alt: "media",
    })
    .on("end", function () {
      console.log("Done");
    })
    .on("error", function (err) {
      console.log("Error during download", err);
    })
    .pipe(dest);
    downloadVideo(auth);
}

function downloadVideo(auth) {
    const videoId = "0BwwA4oUTeiV1UVNwOHItT0xfa2M";
    var dest = fs.createWriteStream("./output/captureImage.jpg");
    drive.files
      .get({
        fileId: videoId,
        alt: "media",
      })
      .on("end", function () {
        console.log("Done");
      })
      .on("error", function (err) {
        console.log("Error during download", err);
      })
      .pipe(dest);
  }
