const shell = require('shelljs');

const basePath = `${__dirname}/../output`
const imgPath = `${basePath}/captureImage.jpg`
const vidPath = `${basePath}/captureVideo.avi`

function captureImage() {
  shell.exec(`fswebcam -d /dev/video0 -r 1280x720 --no-banner ${imgPath}`);
}

function captureVideo() {
  // shell.exec('ffmpeg -f v4l2 -framerate 24 -video_size 1024x768 -i /dev/video2 -t 5 -y ./output/captureVideo.mkv')
  shell.exec(`streamer -q -c /dev/video0 -s 720x480 -f rgb24 -r 20 -t 00:00:10 -o ${vidPath}`);
}

module.exports = {
  captureImage,
  captureVideo
}
