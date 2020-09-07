const execSensors = require("../sensors/execSensors");
const record = require("./sendRecord");

console.log(`Starting...`);

function main() {
  execSensors.main();
  setTimeout(function () {
    record.main();
  }, 10000); // 60 seconds
}

main();
