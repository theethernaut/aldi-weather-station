const shell = require("shelljs");
const capture = require("./capture");
const humidity = require("./humidity");
const files = require("./filesToJson");

const image = __dirname + "/../files/captureImage.jpg";
const video = __dirname + "/../files/newVideo.avi";

function main() {
  capture.captureImage();
  capture.captureVideo();
  files.base64_encodeImage(image);
  files.base64_encodeVideo(video);
  initSensors();
  humidity.execDht11();
}

function initSensors() {
  shell.exec("sudo python3 ../sensors/temperature.py");
  shell.exec("sudo python3 ../sensors/rain.py");
  shell.exec("sudo python3 ../sensors/uvRay.py");
}

module.exports = {
  main
};
