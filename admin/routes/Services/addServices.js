// Importing Libraries
const express = require("express");
// Importing Schema Model
const service = require("../../schema/addServices");
const Userlogs = require("../../schema/addLog");
const { requireAuth } = require("../auth");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/addservices", requireAuth, (req, res) => {
  // Toast Initialization
  const service_toast = req.flash("service_toast");
  res.render("Services/addServices", { title: "Add Services", service_toast });
});
// Posting Data
router.post("/addservices", async (req, res) => {
  let ServiceName, ServiceDesc;
  ServiceName = req.body.ServiceName;
  ServiceDesc = req.body.ServiceDesc;

  const Service = new service({
    ServiceName,
    ServiceDesc,
  });
  const Logs = new Userlogs({
    User: "Shaikh Dev Inc.",
    Action: "Service Added",
  });
  await Service.save()
    .then(async (result) => {
      // Success Toast
      service_toast = {
        type: "success",
        message: "Service Created Successfully!",
      };
      req.flash("service_toast", service_toast);
      await Logs.save();
      console.log("SuccessFully Saved");
      res.redirect("/addservices");
    })
    .catch((err) => {
      // Failed Toast
      service_toast = {
        type: "danger",
        message: "Service Creation Failed!",
      };
      req.flash("service_toast", service_toast);
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
