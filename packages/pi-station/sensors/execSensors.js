const shell = require("shelljs");
const capture = require("./capture");
const humidity = require("./humidity");

function main () {
  shell.exec("python3 rain.py");
  shell.exec("python3 temperature.py");
  shell.exec("python3 uvRay.py");
  capture.captureImage();
  capture.captureVideo();
  humidity.execDht11();
}

main();

module.exports = {
  main
};
