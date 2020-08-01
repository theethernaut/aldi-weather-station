const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let schedule = require("node-schedule");
let nodemailer = require("nodemailer");

const Suscription = require("../models/suscription");
const Record = require("../models/record");
const User = require("../models/user");
const { response } = require("../../app");
let raspi; //Traer dato de la web

getUserName = () => {
  User.find({ "User._id": req.query.user._id }).populate("invitees.user");

  // User.findOne({ "local.email": email, "invitees._id": req.query.invitation_id }, function (err, user) {
  //     if (err) return done(err);
  //     if (user) {
  //       return done(
  //         null,
  //         false,
  //         req.flash("signupMessage", "Este usuario ya existe")
  //       );
  //     }
};

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
    user: "aldisurfschool31@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});

let mailOptions = {
  from: "aldisurfschool31@gmail.com",
  to: getUserName(),
  subject: "Tu reporte de playa esta pronto!",
  text: `<h3>¡Hola!</h3> <br>
        <h4> El reporte para hoy nos dice: <h4><br>
        <p>Temperatura interna: ${internal_temp} </p> <br>
        <p>Temperatura externa: ${external_temp} </p> <br>
        <p>Humedad: ${humidity} </p> <br>
        <p>Direccion del viento: ${wind_direction} </p> <br>
        <p>Velocidad del viento: ${wind_speed} </p> <br>
        <p>Lluvia: ${rain} </p> <br>
        <p>UV index: ${uv_index} </p> <br>
        <p>Riesgo de rayos UV: ${uv_risk_level} </p> <br>
        <p>Imagen: ${image} </p> <br>
        <p>Video: ${video} </p> <br>
        <h4> Gracias por confiar en nosotros. </h4> <br>
        <h3> Weather Station </h3>
       `,
};

var mailScheduler = function (job) {
  // set rules for scheduler
  var rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(0, 6)];
  rule.hour = 16; //Find it from database
  // scheduleJob take a rule and a function
  // you will need to pass a function object
  // into the mailScheduler function
  schedule.scheduleJob("mailJob", rule, job);
};

// Send e-mail
const sendEmail = () =>
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

const main = () => {
  if (active == true) {
    //Bring Active from mongoDB
    mailScheduler(sendEmail);
  } else {
    schedule.cancelJob("mailJob");
  }
};

let getRecordData = () => {
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
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
    return response;
};

module.exports = main;
