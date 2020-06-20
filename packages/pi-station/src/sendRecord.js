const dateTime = require("date-time");
const merge = require("gulp-merge-json");
const gulp = require("gulp");
const axios = require("axios");
const fs = require("fs");

const directoryPath = __dirname + "/../data/";
let records = [];
let failedRecords = [];
let time = dateTime();

function main() {
  mergeFiles();
  readingFiles();
  postImage();
}

main();

function mergeFiles() {
  gulp
    .src("../output/*.json")
    .pipe(
      merge({
        fileName: `record+${time
          .split(" ")
          .join("+")
          .split(":")
          .join("-")}.json`,
      })
    )
    .pipe(gulp.dest("../data"));
}

function readingFiles() {
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    files.forEach(function (file) {
      console.log("por algun motivo no entra aca");
      fs.readFile(`${directoryPath}/${file}`, "utf8", function (err, data) {
        if (err) {
          return console.log(err);
        }
        records.push(data);
        //console.log(records);
      });
    });
  });
}

function postImage() {
  const URL = "http://localhost:3000/images";
  if (typeof records !== "undefined" && records.length > 0) {
    console.log("array records vacio? ", records);
    axios
      .post(URL, records, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": "application/json",
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })
      .then((response) => {
        //handle success
        fs.readdir(directoryPath, (err, files) => {
          if (err) throw err;
          files.forEach(function (file) {
            fs.unlinkSync(`${directoryPath}/${file}`, (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log("File removed correctly.");
              }
            });
            console.log(response.data);
          });
        });
      })
      .catch((error) => {
        //handle error
        console.log(error);
        failedRecords.push(records);
      });
  } else {
    console.log("árray", records);
    axios
      .post(URL, failedRecords, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": "application/json",
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })
      .then((response) => {
        //handle success
        fs.readdir(directoryPath, (err, files) => {
          if (err) throw err;
          files.forEach(function (file) {
            fs.unlinkSync(`${directoryPath}/${file}`, (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log("File removed correctly.");
              }
            });
            console.log(response.data);
          });
        });
      })
      .catch((error) => {
        //handle error
        console.log(error);
        failedRecords.push(failedRecords);
      });
  }
}
