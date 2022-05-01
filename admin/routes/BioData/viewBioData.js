// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const biodata = require("../../schema/addBioData");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/admin/viewbiodata", async (req, res) => {
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
router.get("/admin/viewbiodata/delete/:id", async (req, res) => {
  let id;
  id = req.params.id;
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "BioData Deleted",
  });
  biodata.findByIdAndDelete(id, async (err) => {
    if (err) {
      throw err;
    } else {
      await Logs.save();
      res.redirect("/admin/viewbiodata");
    }
  });
});
// Finding Bio Data by ID
router.get("/admin/viewbiodata/edit/:id", async (req, res) => {
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
router.post("/admin/viewbiodata/edit/:id", async (req, res) => {
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "BioData Updated",
  });

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
    .then(async (result) => {
      await Logs.save();
      updatebio = result;
      console.log("Updated");
      res.redirect("/admin/viewbiodata");
    })
    .catch((err) => {
      console.log(`Error`);
    });
});
// Exporting Router
module.exports = router;
