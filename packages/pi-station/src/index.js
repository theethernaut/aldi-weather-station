const updateImage = require('./updateImage')
//const updateVideo = require('./updateVideo')
//const dhtHumidity = require('./dht11')
const shell = require('shelljs');

console.log(`Starting...`);

function main() {
  //checkDependencies()
  updateImage.postImage()
  //updateVideo.postVideo()
  //dhtHumidity.execDht11()
  //shell.exec('python3 lluvia.py')
}

main();

function checkDependencies() {
  // TODO
}
