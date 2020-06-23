//const execSensors = require("../sensors/execSensors");
const record = require("./sendRecord");

console.log(`Starting...`);

async function main() {
  //await execSensors.main();
  record.main();
}

main();