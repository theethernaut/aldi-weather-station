const express = require("express");
const router = express.Router();
const fs = require("fs");
const mongoose = require("mongoose");

const Record = require("../models/record");
const verifyRaspi = require("./verifyRaspi");

router.get("/", (req, res, next) => {
  Record.find()
    .sort({ _id: -1 })
    .limit(1)
    .select(
      "_id internal_temp humidity image video rain external_temp uv_index uv_risk_level wind_direction wind_speed"
    )
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        records: docs.map((doc) => {
          return {
            _id: doc._id,
            internal_temp: doc.internal_temp,
            humidity: doc.humidity,
            image: doc.image,
            video: doc.video,
            rain: doc.rain,
            external_temp: doc.external_temp,
            uv_index: doc.uv_index,
            uv_risk_level: doc.uv_risk_level,
            wind_direction: doc.wind_direction,
            wind_speed: doc.wind_speed,
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
});

router.get("/public", (req, res, next) => {
  res.send()
});

router.post("/", verifyRaspi, (req, res, next) => {
  fs.writeFile(
    "public/captureImage.jpg",
    req.body.image,
    { encoding: "base64" },
    function (err) {
      err ? console.log(err) : console.log("File image created");
    }
  );
  fs.writeFile(
    "public/captureVideo.avi",
    req.body.video,
    { encoding: "base64" },
    function (err) {
      err ? console.log(err) : console.log("File video created");
    }
  );
  const record = new Record({
    _id: new mongoose.Types.ObjectId(),
    //raspiId:
    internal_temp: req.body.internal_temp,
    humidity: req.body.humidity,
    image: "./public/captureImage.jpg",
    video: "./public/captureVideo.avi",
    rain: req.body.rain,
    external_temp: req.body.external_temp,
    uv_index: req.body.uv_index,
    uv_risk_level: req.body.uv_risk_level,
    wind_direction: "", //req.body.wind_direction,
    wind_speed: "", //req.body.wind_speed
  });
  record
    .save()
    .then((result) => {
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

router.get("/:raspiId", (req, res, next) => {
  const id = req.params.raspiId;
  Record.find({id_raspi : id})
    .sort({ _id: -1 })
    .limit(1)
    .select(
      `_id internal_temp humidity image video rain external_temp uv_index uv_risk_level wind_direction wind_speed`
    )
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        records: docs.map((doc) => {
          return {
            _id: doc._id,
            internal_temp: doc.internal_temp,
            humidity: doc.humidity,
            image: doc.image,
            video: doc.video,
            rain: doc.rain,
            external_temp: doc.external_temp,
            uv_index: doc.uv_index,
            uv_risk_level: doc.uv_risk_level,
            wind_direction: doc.wind_direction,
            wind_speed: doc.wind_speed,
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
});

module.exports = router;
