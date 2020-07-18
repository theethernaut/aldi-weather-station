const fs = require("fs");

function base64_encodeImage(file) {
  let bitmap = fs.readFileSync(file);
  let img = new Buffer.from(bitmap).toString("base64");
  fs.writeFile(__dirname+"/../output/image.json", `{"image":"${img}"}`, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote Image file");
    }
  });
}

function base64_encodeVideo(file) {
  let bitmap = fs.readFileSync(file);
  let vid = new Buffer.from(bitmap).toString("base64");
  fs.writeFile(__dirname+"/../output/video.json", `{"video":"${vid}"}`, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote Video file");
    }
  });
}

module.exports = {
  base64_encodeImage,
  base64_encodeVideo
};
