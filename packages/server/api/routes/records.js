const express = require("express");
const router = express.Router();
const fs = require("fs");

const Record = require("../models/record");

/*router.get("/", (req, res, next) => {
  Image.find()
    .select("_id name imgPath")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        images: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            imgPath: doc.imgPath,
            request: {
              type: "GET",
              url: "http://localhost:3000/images/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});*/

router.post("/", (req, res, next) => {
  /*fs.writeFile(
    "uploads/captureImage.jpg",
    req.body.image,
    { encoding: "base64" },
    function (err) {
      err ? console.log(err) : console.log("File image created");
    }
  );
  fs.writeFile(
    "uploads/captureVideo.avi",
    req.body.video,
    { encoding: "base64" },
    function (err) {
      err ? console.log(err) : console.log("File video created");
    }
  );*/
  //console.log(req.body);
  const record = new Record({
    _id: new mongoose.Types.ObjectId(),
    internal_temp: req.body.internal_temp,
    humidity: req.body.humidity,
    image: "./uploads/captureImage.jpg",
    video: "./uploads/captureVideo.avi",
    rain: req.body.rain,
    external_temp: req.body.external_temp,
    uv_index: req.body.uv_index,
    uv_risk_level: req.body.uv_risk_level,
    wind_direction: req.body.wind_direction,
    wind_speed: req.body.wind_speed
  });
  /*res.status(201).json({
    message: "Created record successfully",
  });*/
  record
    .save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: "Created record successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/*router.get("/:imageId", (req, res, next) => {
  const id = req.params.imageId;
  Image.findById(id)
    .select("_id name type url")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          image: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/images",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});*/

module.exports = router;
