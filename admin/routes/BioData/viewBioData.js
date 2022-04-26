// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const biodata = require("../../schema/addBioData");
// Creating Router
const router = express.Router();
// Rendering View Page
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
// Deleting Bio Data
router.get("/viewbiodata/delete/:id", async (req, res) => {
  let id;
  id = req.params.id;
  biodata.findByIdAndDelete(id, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/viewbiodata");
    }
  });
});
// Finding Bio Data by ID
router.get("/viewbiodata/edit/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let bio;
  await biodata
    .findById(id)
    .then((result) => {
      bio = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });

  res.render("BioData/updateBioData", { title: "Edit BioData", bio });
});
// Updating Bio Data By Id
router.post("/viewbiodata/edit/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let updatebio;
  await biodata
    .findByIdAndUpdate(id, {
      Name: req.body.MyName,
      Email: req.body.Email,
      Address: req.body.Address,
      AboutMe: req.body.About,
      Phone: req.body.Phone,
      Degree: req.body.Degree,
      Birthday: req.body.Birthday,
      Experience: req.body.Experience,
      Freelance: req.body.Freelance,
      Position: req.body.Position,
    })
    .then((result) => {
      updatebio = result;
      console.log("Updated");
      res.redirect("/viewbiodata");
    })
    .catch((err) => {
      console.log(`Error`);
    });
});
// Exporting Router
module.exports = router;
