// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const certifications = require("../../schema/addCertifications");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/viewcertifications", async (req, res) => {
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
router.get("/viewcertifications/:id", async (req, res) => {
  let id;
  id = req.params.id;
  certifications.findByIdAndDelete(id, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/viewcertifications");
    }
  });
});
// Exporting Router
module.exports = router;
