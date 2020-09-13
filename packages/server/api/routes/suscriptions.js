const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let schedule = require("node-schedule");
let nodemailer = require("nodemailer");
const axios = require("axios");
const https = require("https");

const Suscription = require("../models/suscription");

//const { response } = require("../../app");
const agent = new https.Agent({ rejectUnauthorized: false });
let respuestaRecord = {
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
async function getRecordData(activo, raspiId, userId, hora) {
  const URL = "http://3.20.14.136:80/records/idRaspi";
  axios
    .get(URL, {
      params: {
        idRaspi: raspiId,
      },
      httpsAgent: agent,
      withCredentials: true,
    })
    .then((response) => {
      //handle success
      respuestaRecord = { data: response.data };
      getUserData(activo, userId, hora, respuestaRecord);
    })
    .catch((error) => {
      //handle error
      console.log("Error de GET record data " + error);
    });
}

let respuestaUser = { email: "" };
async function getUserData(activo, userId, hora, respuestaRecord) {
  const URL = "http://3.20.14.136:80/users/userId";
  axios
    .get(URL, {
      params: {
        userId: userId,
      },
      httpsAgent: agent,
      withCredentials: true,
    })
    .then((response) => {
      //handle success
      respuestaUser = { email: response.data.email };
      main(activo, hora, respuestaUser, respuestaRecord);
    })
    .catch((error) => {
      //handle error
      console.log("Error de GET USER DATA: " + error);
    });
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aldisurfschool31@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

let mailOptions = {
  from: "aldisurfschool31@gmail.com",
  to: respuestaUser.email,
  subject: "Tu reporte de playa esta pronto!",
  html: `<h3>¡Datos ambientales de Aldi-Surf-School!</h3> <br>
        <h4> El reporte para hoy nos dice: <h4><br>
        <p>Temperatura interna: ${respuestaRecord.data.internal_temp} </p> <br>
        <p>Temperatura externa: ${respuestaRecord.data.external_temp} </p> <br>
        <p>Humedad: ${respuestaRecord.data.humidity} </p> <br>
        <p>Dirección del viento: ${respuestaRecord.data.wind_direction} </p> <br>
        <p>Velocidad del viento: ${respuestaRecord.data.wind_speed} </p> <br>
        <p>Lluvia: ${respuestaRecord.data.rain} </p> <br>
        <p>UV index: ${respuestaRecord.data.uv_index} </p> <br>
        <p>Riesgo de rayos UV: ${respuestaRecord.data.uv_risk_level} </p> <br>
        <h4> Gracias por confiar en nosotros. </h4> <br>
        <h3> Buenas Olas! <br>
             Weather Station </h3>
       `,
};

var mailScheduler = function (hora, respuestaUser, respuestaRecord) {
  // set rules for scheduler
  var rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(0, 6)];
  rule.hour = "21"; //Find it from database
  // scheduleJob take a rule and a function
  // you will need to pass a function object
  // into the mailScheduler function
  schedule.scheduleJob("mailJob", rule, function () {
    sendEmail(respuestaUser, respuestaRecord);
  });
};

// Send e-mail
const sendEmail = (respuestaUser, respuestaRecord) => {
  mailOptions.to = respuestaUser.email;
  mailOptions.html = `<h3>¡Datos ambientales de Aldi-Surf-School!</h3> <br>
  <h4> El reporte para hoy nos dice: <h4><br>
  <p>Temperatura interna: ${respuestaRecord.data.internal_temp} </p> <br>
  <p>Temperatura externa: ${respuestaRecord.data.external_temp} </p> <br>
  <p>Humedad: ${respuestaRecord.data.humidity} </p> <br>
  <p>Dirección del viento: ${respuestaRecord.data.wind_direction} </p> <br>
  <p>Velocidad del viento: ${respuestaRecord.data.wind_speed} </p> <br>
  <p>Lluvia: ${respuestaRecord.data.rain} </p> <br>
  <p>UV index: ${respuestaRecord.data.uv_index} </p> <br>
  <p>Riesgo de rayos UV: ${respuestaRecord.data.uv_risk_level} </p> <br>
  <h4> Gracias por confiar en nosotros. </h4> <br>
  <h3> Buenas Olas! <br>
       Weather Station </h3>
 `;
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error de email: " + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

function main(activo, hora, respuestaUser, respuestaRecord) {
  if (activo == true || activo == "true") {
    mailScheduler(hora, respuestaUser, respuestaRecord);
  } else {
    schedule.cancelJob("mailJob");
  }
}

router.post("/", (req, res, next) => {
  let activo = req.body.active;
  let raspiId = req.body.raspi;
  let userId = req.user;
  let hora = req.body.hour;
  const suscription = new Suscription({
    _id: new mongoose.Types.ObjectId(),
    user: req.user,
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
          activo: activo,
        };
        getRecordData(activo, raspiId, userId, hora);
        //await main(activo, raspiId, userId, hora);
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
