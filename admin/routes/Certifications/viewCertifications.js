// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const certifications = require("../../schema/addCertifications");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/admin/viewcertifications", async (req, res) => {
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
      throw err;
    } else {
      await Logs.save();
      res.redirect("/admin/viewcertifications");
    }
  });
});
// Exporting Router
module.exports = router;
