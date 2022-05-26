// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const certifications = require("../../schema/addCertifications");
const Userlogs = require("../../schema/addLog");
const { requireAuth } = require("../auth");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/admin/viewcertifications", requireAuth, async (req, res) => {
  // Toast Initialization
  const certificate_toast = req.flash("certificate_toast");
  let Certifications;
  await certifications
    .find()
    .then((result) => {
      Certifications = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Certifications/viewcertifications", {
    title: "View Certifications",
    Certifications,
    certificate_toast,
  });
});
// Deleting Certifications
router.get("/admin/viewcertifications/:id", async (req, res) => {
  let id;
  id = req.params.id;
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "Certification Deleted",
  });
  certifications.findByIdAndDelete(id, async (err) => {
    if (err) {
      // Failed Toast
      certificate_toast = {
        type: "danger",
        message: "Certification Failed to Delete!",
      };
      req.flash("certificate_toast", certificate_toast);
      throw err;
    } else {
      // Success Toast
      certificate_toast = {
        type: "success",
        message: "Certification Deleted Successfully!",
      };
      req.flash("certificate_toast", certificate_toast);
      await Logs.save();
      res.redirect("/admin/viewcertifications");
    }
  });
});
// Exporting Router
module.exports = router;
