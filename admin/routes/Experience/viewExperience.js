// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const experience = require("../../schema/addExperience");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/admin/viewexperience", async (req, res) => {
  let Experience;
  await experience
    .find()
    .then((result) => {
      Experience = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Experience/viewexperience", {
    title: "View Experience",
    Experience,
  });
});

// Deleting Experience
router.get("/admin/viewexperience/delete/:id", async (req, res) => {
  let id;
  id = req.params.id;
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "Experience Deleted",
  });
  experience.findByIdAndDelete(id, async (err) => {
    if (err) {
      throw err;
    } else {
      await Logs.save();
      res.redirect("/admin/viewexperience");
    }
  });
});
// Finding Experience by ID
router.get("/admin/viewexperience/edit/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let Experience;
  await experience
    .findById(id)
    .then((result) => {
      Experience = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });

  res.render("Experience/updateExperience", {
    title: "Edit Experience",
    Experience,
  });
});
// Updating Experience By Id
router.post("/admin/viewexperience/edit/:id", async (req, res) => {
  let id;
  id = req.params.id;
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "Experience Updated",
  });
  let updateexperience;
  await experience
    .findByIdAndUpdate(id, {
      Desc: req.body.Desc,
    })
    .then(async (result) => {
      await Logs.save();
      updateexperience = result;
      console.log("Updated");
      res.redirect("/admin/viewexperience");
    })
    .catch((err) => {
      console.log(`Error`);
    });
});
// Exporting Router
module.exports = router;
