Welcome to Webcam Script.

It uses node-cron to run the script every 30 minutes.

The node script runs a bash command using shelljs to take a single picture and a 10 sec video.

It uses google drive API for uploading image and video to drive. 
Running  npm setup will create the files in google drive. Afterwards it will be overwritten every 5 minutes for picture and 13 for video.

1. npm install  

2. run 'npm setup'

3. run 'npm start'