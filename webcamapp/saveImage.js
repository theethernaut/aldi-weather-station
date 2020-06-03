const mongoose = require('mongoose')
const schema = mongoose.Schema
const path = require('path')
const Grid = require('gridfs-stream')
const fs = require('fs')
let imagepath = path.join(__dirname, '../captureImage.jpg')

mongoose.connect('mongodb://142.93.53.103/aldisurfschool', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
})

const connection = mongoose.connection
Grid.mongo = mongoose.mongo	
	 
connection.on('open', function(){
	let gfs=Grid(connection.db)

	let writestream = gfs.createWriteStream({
		filename: 'captureImage.jpg'
	})    
	
	fs.createReadStream(imagepath).pipe(writestream)

	writestream.on('close', function (file) {
		console.log(file.filename + " Written to DB.")
		connection.close(function () { 
			console.log('Mongoose default connection disconnected'); 
		})
	})
})
