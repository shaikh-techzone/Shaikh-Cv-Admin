const express = require("express");
const certifications = require("../../schema/addCertifications");
const mongoose = require("mongoose");
const router = express.Router();

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

router.get("/viewcertifications/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let action = { _id: id };
  certifications.deleteOne(action, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/viewcertifications");
    }
  });
});
module.exports = router;
