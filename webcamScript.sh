#!/bin/bash
# Take picture controller for USB webcam

DIR=/home/pi/webcam
filename=captureImage.jpg
fswebcam -d /dev/video0 -r 1280x720 --no-banner $DIR/$filename

