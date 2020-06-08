Welcome to Webcam Script.

It uses node-cron to run the script every 30 minutes.

The node script runs a bash command using shelljs to take a single picture and a 10 sec video.

It uses google drive API for uploading image and video to drive. 
Running  npm setup will create the files in google drive. Afterwards it will be overwritten every 5 minutes for picture and 13 for video.

SETUP

1. Allow Google Drive API at https://developers.google.com/drive/api/v3/quickstart/go. Download credentials.json file and locate it on pi-station/credentials/

2. Run: packages/pi-station/scripts imageWebCamScript.sh 

3. Run: packages/pi-station/scripts videoWebCamScript.sh 

4. npm install  

5. run packages/pi-station/setup 'npm setup'

6. run packages/pi-station/src 'npm .'