const execSensors = require("../sensors/execSensors");
const record = require("./sendRecord");
var cron = require('node-cron');
 
console.log(`Starting...`);

//cron.schedule('*/30 6-21 * * *', () => {

function main() {
  cron.schedule('*/7 * * * *', () => {
    execSensors.main();
    setTimeout(function () {
      record.main();
    }, 8000);
  });
}

main();
