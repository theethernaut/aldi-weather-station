const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");
const axios = require("axios");
const https = require("https");

const Suscription = require("../models/suscription");
const Record = require("../models/record");
const User = require("../models/user");
//const { response } = require("../../app");

/**
 * c=const / l=let / f=function
 */

const cAgent = new https.Agent({ rejectUnauthorized: false });

let lRespuestaRecord = {
  data: {
    _id: "",
    idRaspberry: "",
    internal_temp: "",
    humidity: "",
    image: "",
    video: "",
    rain: "",
    external_temp: "",
    uv_index: "",
    uv_risk_level: "",
    wind_direction: "",
    wind_speed: "",
  },
};

async function fGetRecordData(lActivo, lRaspiId, lUserId, lHora) {
  const URL = "http://3.20.14.136:80/records/idRaspi";
  axios
    .get(URL, {
      params: {
        idRaspi: lRaspiId,
      },
      httpsAgent: cAgent,
      withCredentials: true,
    })
    .then((response) => {
      //handle success
      lRespuestaRecord = { data: response.data };
      fGetUserData(lActivo, lUserId, lHora, lRespuestaRecord);
    })
    .catch((error) => {
      //handle error
      console.log("Error de GET record data " + error);
    });
}

let lRespuestaUser = { email: "" };

async function fGetUserData(lActivo, lUserId, lHora, lRespuestaRecord) {
  const URL = "http://3.20.14.136:80/users/userId";
  axios
    .get(URL, {
      params: {
        userId: lUserId,
      },
      httpsAgent: cAgent,
      withCredentials: true,
    })
    .then((response) => {
      //handle success
      lRespuestaUser = { email: response.data.email };
      fMain(lActivo, lHora, lRespuestaUser, lRespuestaRecord);
    })
    .catch((error) => {
      //handle error
      console.log("Error de GET USER DATA: " + error);
    });
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let lTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aldisurfschool31@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

let lMailOptions = {
  from: "aldisurfschool31@gmail.com",
  to: lRespuestaUser.email,
  subject: "Tu reporte de playa esta pronto!",
  html: `<h3>¡Datos ambientales de Aldi-Surf-School!</h3> <br>
        <h4> El reporte para hoy nos dice: <h4><br>
        <p>Temperatura interna: ${lRespuestaRecord.data.internal_temp} </p> <br>
        <p>Temperatura externa: ${lRespuestaRecord.data.external_temp} </p> <br>
        <p>Humedad: ${lRespuestaRecord.data.humidity} </p> <br>
        <p>Dirección del viento: ${lRespuestaRecord.data.wind_direction} </p> <br>
        <p>Velocidad del viento: ${lRespuestaRecord.data.wind_speed} </p> <br>
        <p>Lluvia: ${lRespuestaRecord.data.rain} </p> <br>
        <p>UV index: ${lRespuestaRecord.data.uv_index} </p> <br>
        <p>Riesgo de rayos UV: ${lRespuestaRecord.data.uv_risk_level} </p> <br>
        <h4> Gracias por confiar en nosotros. </h4> <br>
        <h3> Buenas Olas! <br>
             Weather Station </h3>
       `,
};

let lMailScheduler = function (lHora, lRespuestaUser, lRespuestaRecord) {
  // set rules for scheduler
  var rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(0, 6)];
  rule.hour = "21"; //Find it from database
  // scheduleJob take a rule and a function
  // you will need to pass a function object
  // into the lMailScheduler function
  schedule.scheduleJob("mailJob", rule, function () {
    lSendEmail(lRespuestaUser, lRespuestaRecord);
  });
};

// Send e-mail
let lSendEmail = (lRespuestaUser, lRespuestaRecord) => {
  lMailOptions.to = lRespuestaUser.email;
  lMailOptions.html = `<h3>¡Datos ambientales de Aldi-Surf-School!</h3> <br>
  <h4> El reporte para hoy nos dice: <h4><br>
  <p>Temperatura interna: ${lRespuestaRecord.data.internal_temp} </p> <br>
  <p>Temperatura externa: ${lRespuestaRecord.data.external_temp} </p> <br>
  <p>Humedad: ${lRespuestaRecord.data.humidity} </p> <br>
  <p>Dirección del viento: ${lRespuestaRecord.data.wind_direction} </p> <br>
  <p>Velocidad del viento: ${lRespuestaRecord.data.wind_speed} </p> <br>
  <p>Lluvia: ${lRespuestaRecord.data.rain} </p> <br>
  <p>UV index: ${lRespuestaRecord.data.uv_index} </p> <br>
  <p>Riesgo de rayos UV: ${lRespuestaRecord.data.uv_risk_level} </p> <br>
  <h4> Gracias por confiar en nosotros. </h4> <br>
  <h3> Buenas Olas! <br>
       Weather Station </h3>
 `;
  lTransporter.sendMail(lMailOptions, function (error, info) {
    if (error) {
      console.log("Error de email: " + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

function fMain(lActivo, lHora, lRespuestaUser, lRespuestaRecord) {
  if (lActivo == true || lActivo == "true") {
    lMailScheduler(lHora, lRespuestaUser, lRespuestaRecord);
  } else {
    schedule.cancelJob("mailJob");
  }
}

console.log("Antes del router");

router.post("/", (req, res, next) => {
  console.log("Dentro del router");
  let lActivo = req.body.active;
  let lRaspiId = req.body.raspi;
  let lUserId = req.session.passport.user;
  let lHora = req.body.hour;
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
      .then(() => {
        const response = {
          activo: lActivo,
        };
        fGetRecordData(lActivo, lRaspiId, lUserId, lHora);
        //await fMain(lActivo, lRaspiId, lUserId, lHora);
        res.status(201).json(response);
      })
      .catch((err) => {
        console.log("Error de POST :" + err);
        res.status(500).json({
          error: err,
        });
      });
  });
});

module.exports = router;
