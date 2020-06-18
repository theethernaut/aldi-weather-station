var axios = require("axios");
const formData = require("form-data");
const fs = require("fs");

function postImage() {
  const URL = "http://localhost:3000/images";

  let data = new formData();
  const file = __dirname + "/../output/captureImage.jpg";
  let fileEncoded = base64_encode(file);
  data.append('file', fileEncoded, file.fileName);
  
  axios
    .post(URL, data, {
      headers: {
        accept: "application/json",
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    })
    .then((response) => {
      //handle success
      console.log(response.data);
    })
    .catch((error) => {
      //handle error
      console.log(error);
    });
}

function base64_encode(file) {
  // read binary data
  let bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  let img = new Buffer.from(bitmap).toString("base64");
  return img;
}

module.exports = {
  postImage
}
