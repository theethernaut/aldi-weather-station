const execSensors = require("../sensors/execSensors");
const record = require("./sendRecord");

console.log(`Starting...`);

function main() {
  execSensors.main();
  setTimeout(function () {
    record.main();
  }, 60000); // 60 seconds
}

main();
