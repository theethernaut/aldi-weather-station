const upload = require('./upload')
const dht = require('./dht11')

console.log(`Starting...`)

function main() {
 // checkDependencies()
 // upload.startImageJob()
  //upload.startVideoJob()
  dht.execDht11()
}

main()

function checkDependencies() {
  // TODO
}
