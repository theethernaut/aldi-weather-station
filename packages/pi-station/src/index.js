//const {PythonShell} = require('python-shell')
//const updateImage = require('./updateImage')
//const updateVideo = require('./updateVideo')
//const dhtHumidity = require('./dht11')
var http = require("http");
http.post = require("http-post");
const formData = require("form-data");
const fs = require("fs");
console.log(`Starting...`);

function main() {
  //checkDependencies()
  //updateImage.startImageJob()
  //updateVideo.startVideoJob()
  //dhtHumidity.execDht11()
  /*PythonShell.run('lluvia.py', null, function (err) {
    if (err) throw err;
  });*/
  const URL = "http://localhost:3000/images";
  let data = new formData();
  const file = __dirname + "/../output/captureImage.jpg";
  let fileEncoded = base64_encode(file);
  data.append("file", fileEncoded, file.fileName);
  let data1 = {
    name: "captureImage",
    type: "jpeg",
    url: "../uploads/captureImage.jpg",
    file: fileEncoded,
  };

  /*axios
    .post(URL, data1, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/octet-stream",
      },
    })
    .then((response) => {
      //handle success
      console.log(response.data);
    })
    .catch((error) => {
      //handle error
      console.log(error);
    });*/

  data = {
    name: "captureImage",
    type: "jpeg",
    url: "../uploads/captureImage.jpg",
    file: fileEncoded,
  };

  let fileHttp = {
    file: {
      param: "file",
      path: "../output/hola.jpg",
    }
  };

  http.post(URL, data, fileHttp, function (res) {
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
      console.log(chunk);
    });
  });
}

main();

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  let img = new Buffer(bitmap).toString("base64");
  return img;
}

function checkDependencies() {
  // TODO
}
