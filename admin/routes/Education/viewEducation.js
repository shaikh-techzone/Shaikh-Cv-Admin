// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const education = require("../../schema/addEducation");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/vieweducation", async (req, res) => {
  let Education;
  await education
    .find()
    .then((result) => {
      Education = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Education/vieweducation", {
    title: "View Education",
    Education,
  });
});
// Deleting Education
router.get("/vieweducation/:id", async (req, res) => {
  let id;
  id = req.params.id;
  education.findByIdAndDelete(id, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/vieweducation");
    }
  });
});
// Exporting Router
module.exports = router;
