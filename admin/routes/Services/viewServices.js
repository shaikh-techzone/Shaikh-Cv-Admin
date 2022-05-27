// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const service = require("../../schema/addServices");
const Userlogs = require("../../schema/addLog");
const { requireAuth } = require("../auth");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/viewservices", requireAuth, async (req, res) => {
  // Toast Initialization
  const service_toast = req.flash("service_toast");

  let services;
  await service
    .find()
    .then((result) => {
      services = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Services/viewServices", {
    title: "View Services",
    services,
    service_toast,
  });
});

// Deleting Services
router.get("/viewservices/delete/:id", async (req, res) => {
  let id;
  id = req.params.id;
  const Logs = new Userlogs({
    User: "Shaikh Dev Inc.",
    Action: "Service Deleted",
  });
  service.findByIdAndDelete(id, async (err) => {
    if (err) {
      // Failed Toast
      service_toast = {
        type: "danger",
        message: "Service Failed to Delete!",
      };
      req.flash("service_toast", service_toast);
      throw err;
    } else {
      // Success Toast
      service_toast = {
        type: "success",
        message: "Service Deleted Successfully!",
      };
      req.flash("service_toast", service_toast);
      await Logs.save();
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
  const Logs = new Userlogs({
    User: "Shaikh Dev Inc.",
    Action: "Service Updated",
  });
  await service
    .findByIdAndUpdate(id, {
      ServiceDesc: req.body.ServiceDesc,
    })
    .then(async (result) => {
      // Success Toast
      service_toast = {
        type: "success",
        message: "Service Updated Successfully!",
      };
      req.flash("service_toast", service_toast);
      await Logs.save();
      updateservice = result;
      console.log("Updated");
      res.redirect("/viewservices");
    })
    .catch((err) => {
      // Failed Toast
      service_toast = {
        type: "danger",
        message: "Service Failed To Update!",
      };
      req.flash("service_toast", service_toast);
      console.log(`Error`);
    });
});
// Exporting Router
module.exports = router;
