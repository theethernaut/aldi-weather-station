const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Raspi = require("../models/raspi");

const jwt = require("jsonwebtoken");
const config = require("../config/keys");

router.post("/", async (req, res) => {
  try {
    // Receiving Data
    const { username, password } = req.body;
    // Creating a new Raspi
    const raspi = new Raspi({
      _id: new mongoose.Types.ObjectId(),
      username,
      password,
    });
    raspi.password = await raspi.encryptPassword(password);
    await raspi.save();
    // Create a Token
    const token = jwt.sign({ id: raspi.id }, config.secret, {});

    res.json({ auth: true, token });
  } catch (e) {
    console.log(e);
    res.status(500).send("There was a problem registering your Station");
  }
});

router.get("/", (req, res) => {
  const raspi = Raspi.find()
    .select("_id username")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        raspis: docs.map((doc) => {
          return {
            _id: doc._id,
            username: doc.username,
          };
        }),
      };
      res.status(200).json(response);
      if (!raspi) {
        return res.status(404).send("No station found.");
      }
    });
});

router.get("/:raspiId", (req, res, next) => {
  const id = req.params.raspiId;
  Raspi.findById(id)
    .select("_id username password")
    .limit(1)
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          raspi: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/raspis",
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
});

router.patch("/:raspiId", (req, res, next) => {
  const id = req.params.raspiId;
  const updateRaspi = {};
  for (const raspi of req.body) {
    updateRaspi[raspi.propName] = raspi.value;
  }
  Raspi.update({ _id: id }, { $set: updateRaspi })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Station updated",
        request: {
          type: "PATCH",
          url: "http://localhost:3000/raspis/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:raspiId", (req, res, next) => {
  const id = req.params.raspiId;
  Raspi.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Station deleted",
        request: {
          type: "DELETE",
          url: "http://localhost:3000/raspis",
          body: { username: "String", password: "String" },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
