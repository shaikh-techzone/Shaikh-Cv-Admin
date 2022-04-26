// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const experience = require("../../schema/addExperience");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/viewexperience", async (req, res) => {
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
router.get("/viewexperience/delete/:id", async (req, res) => {
  let id;
  id = req.params.id;
  experience.findByIdAndDelete(id, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/viewexperience");
    }
  });
});
// Finding Experience by ID
router.get("/viewexperience/edit/:id", async (req, res) => {
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
router.post("/viewexperience/edit/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let updateexperience;
  await experience
    .findByIdAndUpdate(id, {
      Desc: req.body.Desc,
    })
    .then((result) => {
      updateexperience = result;
      console.log("Updated");
      res.redirect("/viewexperience");
    })
    .catch((err) => {
      console.log(`Error`);
    });
});
// Exporting Router
module.exports = router;
