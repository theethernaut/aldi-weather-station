const shell = require('shelljs');

function captureImage() {
  shell.exec('fswebcam -d /dev/video0 -r 1280x720 --no-banner /home/pi/aldi-weather-station/packages/pi-station/src/output/captureImage.jpg');
}

function captureVideo() {
   shell.exec('streamer -q -c /dev/video0 -s 720x480 -f rgb24 -r 20 -t 00:00:10 -o /home/pi/aldi-weather-station/packages/pi-station/src/output/captureVideo.avi');
  //shell.exec('ffmpeg -f v4l2 -framerate 24 -video_size 1024x768 -i /dev/video2 -t 5 -y ./output/captureVideo.mkv')
}

module.exports = {
  captureImage,
  captureVideo
}