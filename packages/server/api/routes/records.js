const express = require("express");
const router = express.Router();
const fs = require("fs");
const mongoose = require("mongoose");
const shell = require("shelljs")

const Record = require("../models/record");
const verifyRaspi = require("./verifyRaspi");

router.get("/", (req, res, next) => {
  Record.findOne()
    .sort({ _id: -1 })
    .exec()
    .then((docs) => {
      const response = {
        _id: docs._id,
        idRaspberry: docs.idRaspberry,
        internal_temp: docs.internal_temp,
        humidity: docs.humidity,
        image: docs.image,
        video: docs.video,
        rain: docs.rain,
        external_temp: docs.external_temp,
        uv_index: docs.uv_index,
        uv_risk_level: docs.uv_risk_level,
        wind_direction: docs.wind_direction,
        wind_speed: docs.wind_speed,
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
  res.send();
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
  shell.exec(`ffmpeg -i public/captureVideo.avi -y public/captureVideo.mp4`)
  const record = new Record({
    _id: new mongoose.Types.ObjectId(),
    idRaspberry: req.body.idRaspberry,
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
  record.save(function (error) {
    Record.find({})
      .populate("idRaspberry")
      .exec()
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
});

router.get("/idRaspi", (req, res, next) => {
  const id = req.query.idRaspi;
  Record.findOne({ idRaspberry: id })
    .sort({ _id: -1 })
    .exec()
    .then((docs) => {
      const response = {
        _id: docs._id,
        idRaspberry: docs.idRaspberry,
        internal_temp: docs.internal_temp,
        humidity: docs.humidity,
        image: docs.image,
        video: docs.video,
        rain: docs.rain,
        external_temp: docs.external_temp,
        uv_index: docs.uv_index,
        uv_risk_level: docs.uv_risk_level,
        wind_direction: docs.wind_direction,
        wind_speed: docs.wind_speed,
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
