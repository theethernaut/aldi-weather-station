const shell = require("shelljs");
const capture = require("./capture");
const humidity = require("./humidity");
const files = require("./filesToJson");

const image = __dirname + "/../files/captureImage.jpg";
const video = __dirname + "/../files/newVideo.avi";

function main() {
  shell.exec("python3 rain.py");
  shell.exec("python3 temperature.py");
  shell.exec("python3 uvRay.py");
  capture.captureImage();
  capture.captureVideo();
  humidity.execDht11();
  files.base64_encodeImage(image);
  files.base64_encodeVideo(video);
}

main();

module.exports = main;
