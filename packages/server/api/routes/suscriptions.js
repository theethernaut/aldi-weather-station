const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let schedule = require("node-schedule");
let nodemailer = require("nodemailer");
const axios = require("axios");

const Suscription = require("../models/suscription");
const Record = require("../models/record");
const User = require("../models/user");
//const { response } = require("../../app");

let respuestaRecord;
let getRecordData = (raspiId) => {
  const URL = "http://localhost:3000/records/idRaspi";
  axios
    .get(URL, {
      params: {
        idRaspi: raspiId,
      },
    })
    .then((response) => {
      //handle success
      respuestaRecord = response;
    })
    .catch((error) => {
      //handle error
      console.log(error);
    });
};

let respuestaUser;
let getUserData = (userId) => {
  const URL = "http://localhost:3000/users/userId";
  axios
    .get(URL, {
      params: {
        userId: userId,
      },
    })
    .then((response) => {
      //handle success
      respuestaUser = response;
    })
    .catch((error) => {
      //handle error
      console.log(error);
    });
};

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aldisurfschool31@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});

let mailOptions = {
  // from: "aldisurfschool31@gmail.com",
  // to: respuestaUser.local.email,
  // subject: "Tu reporte de playa esta pronto!",
  // html: `<h3>¡Datos ambientales de Aldi-Surf-School!</h3> <br>
  //       <h4> El reporte para hoy nos dice: <h4><br>
  //       <p>Temperatura interna: ${respuestaRecord.internal_temp} </p> <br>
  //       <p>Temperatura externa: ${respuestaRecord.external_temp} </p> <br>
  //       <p>Humedad: ${respuestaRecord.humidity} </p> <br>
  //       <p>Dirección del viento: ${respuestaRecord.wind_direction} </p> <br>
  //       <p>Velocidad del viento: ${respuestaRecord.wind_speed} </p> <br>
  //       <p>Lluvia: ${respuestaRecord.rain} </p> <br>
  //       <p>UV index: ${respuestaRecord.uv_index} </p> <br>
  //       <p>Riesgo de rayos UV: ${respuestaRecord.uv_risk_level} </p> <br>
  //       <p>Imagen: ${respuestaRecord.image} </p> <br>
  //       <p>Video: ${respuestaRecord.video} </p> <br>
  //       <h4> Gracias por confiar en nosotros. </h4> <br>
  //       <h3> Buenas Olas! <br>
  //            Weather Station </h3>
  //      `,
};

var mailScheduler = function (hora, job) {
  // set rules for scheduler
  var rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(0, 6)];
  rule.hour = hora; //Find it from database
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

const main = (activo, raspiId, userId, hora) => {
  if (activo == true) {
    getRecordData(raspiId);
    getUserData(userId);
    //Bring Active from mongoDB
    mailScheduler(hora, sendEmail());
  } else {
    schedule.cancelJob("mailJob");
  }
};

router.post("/", (req, res, next) => {
  let activo = req.body.active;
  let raspiId = req.body.raspi;
  let userId = req.session.passport.user;
  let hora = req.body.hour;
  const suscription = new Suscription({
    _id: new mongoose.Types.ObjectId(),
    user: req.session.passport.user,
    raspi: req.body.raspi,
    hour: req.body.hour,
    active: req.body.active,
  });
  suscription.save(function (error) {
    Suscription.find({})
      .populate("user")
      .populate("zone")
      .exec()
      .then((result) => {
        res.status(201).json({
          message: "Created record successfully",
          active: result.active,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });

  main(activo, raspiId, userId, hora);
});

module.exports = router;
