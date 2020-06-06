const updateImage = require('./updateImage')
const updateVideo = require('./updateVideo')
//const dhtHumidity = require('./dht11')

console.log(`Starting...`)

function main() {
  checkDependencies()
  updateImage.startImageJob()
  updateVideo.startVideoJob()
  //dhtHumidity.execDht11()
}

main()

function checkDependencies() {
  // TODO
}
