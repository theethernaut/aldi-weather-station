const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let cron = require("node-cron");
let nodemailer = require("nodemailer");

const Suscription = require("../models/suscription");
const Record = require("../models/record");
const User = require("../models/user");
let raspi;

getUserName = () => {
    User
    .find({ "invitees._id": req.query.invitation_id })
    .populate('invitees.user')

    // User.findOne({ "local.email": email, "invitees._id": req.query.invitation_id }, function (err, user) {
    //     if (err) return done(err);
    //     if (user) {
    //       return done(
    //         null,
    //         false,
    //         req.flash("signupMessage", "Este usuario ya existe")
    //       );
    //     }
}

getRecordData();
let internal_temp = getRecordData.records.internal_temp;
let humidity = getRecordData.records.humidity;
let image = getRecordData.records.image;
let video = getRecordData.records.video;
let rain = getRecordData.records.rain;
let external_temp = getRecordData.records.external_temp;
let uv_index = getRecordData.records.uv_index;
let uv_risk_level = getRecordData.records.uv_risk_level;
let wind_direction = getRecordData.records.wind_direction;
let wind_speed = getRecordData.records.wind_speed;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "<FROM_EMAIL_ADDRESS>",
    pass: "<FROM_EMAIL_PASSWORD>",
  },
});

let mailOptions = {
  from: "<FROM_EMAIL_ADDRESS>",
  to: "<TO_EMAIL_ADDRESS>",
  subject: `${}`,
  text: "Some content to send",
};

cron.schedule("* * * * *", () => {
  // Send e-mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

let getRecordData = () => router.get("/", (req, res, next) => {
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

// module.exports = router;
