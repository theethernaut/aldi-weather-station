const dateTime = require("date-time");
const merge = require("gulp-merge-json");
const gulp = require("gulp");
const axios = require("axios");
const fs = require("fs");

const directoryPath = `${__dirname}/../data`;
let time = dateTime();

function main() {
  mergeFiles();

  setTimeout(function () {
    readFiles();
  }, 10000); // 10 seconds
}

function mergeFiles() {
  gulp
    .src(`${__dirname}/../output/*.json`)
    .pipe(
      merge({
        fileName: `record+${time
          .split(" ")
          .join("+")
          .split(":")
          .join("-")}.json`,
      })
    )
    .pipe(gulp.dest(`${directoryPath}`));
}

function readFiles() {
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    files.forEach(function (file) {
      fs.readFile(`${directoryPath}/${file}`, "utf8", function (err, data) {
        if (err) {
          return console.log(err);
        }
        postData(data);
      });
    });
  });
}

function postData(data) {
  const URL = "http://3.20.14.136:80/records";
  axios
    .post(URL, data, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "application/json",
        "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjVkZWVjNDU1Yzg0MzM3MGFjMDNmNiIsImlhdCI6MTU5NjMxNzQyMH0.wHgJX2chNq7ZKycv4CzsAKOyBg-aZn7dvMZ7bpUjowc"
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
      console.log(error);
    });
}

module.exports = {
  main
};
