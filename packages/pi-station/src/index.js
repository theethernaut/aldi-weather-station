const execSensors = require("../sensors/execSensors");
const record = require("./sendRecord");

console.log(`Starting...`);

function main() {
  execSensors.main();
  record.main();
}

main();