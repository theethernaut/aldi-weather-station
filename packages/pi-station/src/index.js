let {PythonShell} = require('python-shell')
//const updateImage = require('./updateImage')
//const updateVideo = require('./updateVideo')
//const dhtHumidity = require('./dht11')


console.log(`Starting...`)
main()
async function main() {
  //checkDependencies()
  //updateImage.startImageJob()
  //updateVideo.startVideoJob()
  //dhtHumidity.execDht11()
  await PythonShell.run('lluvia.py', null, function (err) {
    if (err) throw err;
      console.log('finished');
    });
}



function checkDependencies() {
  // TODO
}
