const express = require("express");
const service = require("../../schema/addServices");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/viewservices", async (req, res) => {
  let services;
  await service
    .find()
    .then((result) => {
      services = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Services/viewServices", { title: "View Services", services });
});

router.get("/viewservices/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let action = { _id: id };
  service.deleteOne(action, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/viewservices");
    }
  });
});

module.exports = router;
