const shell = require("shelljs");
const capture = require("./capture");
const humidity = require("./humidity");
const files = require("./filesToJson");

const image = __dirname + "/../files/captureImage.jpg";
const video = __dirname + "/../files/newVideo.avi";

async function main() {
  initSensors();
  capture.captureImage();
  capture.captureVideo();
  await humidity.execDht11();
  console.log('llega')
  files.base64_encodeImage(image);
  files.base64_encodeVideo(video);
}

function initSensors() {
  shell.exec("python3 rain.py");
  shell.exec("python3 temperature.py");
  shell.exec("python3 uvRay.py");
}

module.exports = main;
