const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require('fs')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'video/x-msvideo') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

const Video = require("../models/video");

router.get("/", (req, res, next) => {
  Video.find()
    .select("_id name videoPath")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        images: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            videoPath: doc.videoPath,
            request: {
              type: "GET",
              url: "http://localhost:3000/images/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", upload.single('file'), (req, res, next) => {
  fs.writeFile("uploads/captureVideo.avi", req.body.file, {encoding:'base64'},function(err){
    err ? console.log(err) : console.log('File created')
  })
  res.status(201).json({
    message: "Created video successfully"
  });
  /*const video = new Video({
    _id: new mongoose.Types.ObjectId(),
    name: 'captureVideo.avi',
    imgPath: './../uploads'
  });
  video
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created video successfully",
        createdImage: {
            _id: result._id,
            name: result.name,
            videoPath: result.videoPath,
            request: {
                type: 'GET',
                url: "http://localhost:3000/videos/" + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });*/
});

router.get("/:imageId", (req, res, next) => {
  const id = req.params.imageId;
  Image.findById(id)
    .select("_id name type url")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            image: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/images'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:imageId", (req, res, next) => {
  const id = req.params.imageId;
  const updateImg = {};
  for (const img of req.body) {
    updateImg[img.propName] = img.value;
  }
  Image.update({ _id: id }, { $set: updateImg })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Image updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/images/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

/*router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Product deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/products',
              body: { name: 'String', price: 'Number' }
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});*/

module.exports = router;
