// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const biodata = require("../../schema/addBioData");
const Userlogs = require("../../schema/addLog");
const { requireAuth } = require("../auth");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/viewbiodata", requireAuth, async (req, res) => {
  // Toast Initialization
  const bio_toast = req.flash("bio_toast");
  let Biodata;
  await biodata
    .find()
    .then((result) => {
      Biodata = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("BioData/viewBioData", {
    title: "View BioData",
    Biodata,
    bio_toast,
  });
});
// Deleting Bio Data
router.get("/viewbiodata/delete/:id", async (req, res) => {
  let id;
  id = req.params.id;
  const Logs = new Userlogs({
    User: "Shaikh Dev Inc.",
    Action: "BioData Deleted",
  });
  biodata.findByIdAndDelete(id, async (err) => {
    if (err) {
      // Failed Toast
      bio_toast = {
        type: "danger",
        message: "BioData Deletation Failed!",
      };
      req.flash("bio_toast", bio_toast);
      throw err;
    } else {
      // Success Toast
      bio_toast = {
        type: "success",
        message: "BioData Deleted Successfully!",
      };
      req.flash("bio_toast", bio_toast);
      await Logs.save();
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
  const Logs = new Userlogs({
    User: "Shaikh Dev Inc.",
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
      // Success Toast
      bio_toast = {
        type: "success",
        message: "BioData Updated Successfully!",
      };
      req.flash("bio_toast", bio_toast);
      await Logs.save();
      updatebio = result;
      console.log("Updated");
      res.redirect("/viewbiodata");
    })
    .catch((err) => {
      // Failed Toast
      bio_toast = {
        type: "danger",
        message: "BioData Failed To Update",
      };
      req.flash("bio_toast", bio_toast);
      console.log(`Error`);
    });
});
// Exporting Router
module.exports = router;
