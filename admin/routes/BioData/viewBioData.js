const express = require("express");
const biodata = require("../../schema/addBioData");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/viewbiodata", async (req, res) => {
  let Biodata;
  await biodata
    .find()
    .then((result) => {
      Biodata = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("BioData/viewBioData", { title: "View BioData", Biodata });
});

router.get("/viewbiodata/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let action = { _id: id };
  biodata.deleteOne(action, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/viewbiodata");
    }
  });
});
module.exports = router;
