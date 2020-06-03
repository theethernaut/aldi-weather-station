const shell = require('shelljs');

function captureImage() {
  shell.exec('./scripts/webcamScript.sh');
}

function captureVideo() {
  // shell.exec('./scripts/videoWebcamScript.sh');

  shell.exec('ffmpeg -f v4l2 -framerate 24 -video_size 1024x768 -i /dev/video2 -t 5 -y ./output/captureVideo.mkv')
}

module.exports = {
  captureImage,
  captureVideo
}
