// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const service = require("../../schema/addServices");
// Creating Router
const router = express.Router();
// Rendering View Page
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

// Deleting Services
router.get("/viewservices/delete/:id", async (req, res) => {
  let id;
  id = req.params.id;
  service.findByIdAndDelete(id, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/viewservices");
    }
  });
});
// Finding Services by ID
router.get("/viewservices/edit/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let Service;
  await service
    .findById(id)
    .then((result) => {
      Service = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });

  res.render("Services/updateServices", { title: "Edit Services", Service });
});
// Updating Services By Id
router.post("/viewservices/edit/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let updateservice;
  await service
    .findByIdAndUpdate(id, {
      ServiceDesc: req.body.ServiceDesc,
    })
    .then((result) => {
      updateservice = result;
      console.log("Updated");
      res.redirect("/viewservices");
    })
    .catch((err) => {
      console.log(`Error`);
    });
});
// Exporting Router
module.exports = router;
