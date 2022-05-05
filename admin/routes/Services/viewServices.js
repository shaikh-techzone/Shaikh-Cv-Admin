// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const service = require("../../schema/addServices");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/admin/viewservices", async (req, res) => {
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
router.get("/admin/viewservices/delete/:id", async (req, res) => {
  let id;
  id = req.params.id;
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "Service Deleted",
  });
  service.findByIdAndDelete(id, async (err) => {
    if (err) {
      throw err;
    } else {
      await Logs.save();
      res.redirect("/admin/viewservices");
    }
  });
});
// Finding Services by ID
router.get("/admin/viewservices/edit/:id", async (req, res) => {
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
router.post("/admin/viewservices/edit/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let updateservice;
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "Service Updated",
  });
  await service
    .findByIdAndUpdate(id, {
      ServiceDesc: req.body.ServiceDesc,
    })
    .then(async (result) => {
      await Logs.save();
      updateservice = result;
      console.log("Updated");
      res.redirect("/admin/viewservices");
    })
    .catch((err) => {
      console.log(`Error`);
    });
});
// Exporting Router
module.exports = router;
