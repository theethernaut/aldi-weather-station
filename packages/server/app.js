var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

//setup your oauth credentials and tokens

oauth2Client.setCredentials(tokens);

var drive = google.drive({
    version: 'v2',
    auth: oauth2Client
});

drive.files.get({
    fileId: fileId, //id of the file you are looking for
    alt: 'media'
}, {
    responseType: 'arraybuffer',
    encoding: null
}, function(err, response) {
    if (err) {
        console.log(err);

        //handle the error
    } else {
        var imageType = response.headers['content-type'];
        var base64 = new Buffer(response.data, 'utf8').toString('base64');
        var dataURI = 'data:' + imageType + ';base64,' + base64;

        res.send(dataURI);
    }
});