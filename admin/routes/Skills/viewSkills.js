// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const skills = require("../../schema/addSkills");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/viewskills", async (req, res) => {
  let Skills;
  await skills
    .find()
    .then((result) => {
      Skills = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Skills/viewskills", { title: "View Skills", Skills });
});
// Deleting Skills
router.get("/viewskills/:id", async (req, res) => {
  let id;
  id = req.params.id;

  skills.findByIdAndDelete(id, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/viewskills");
    }
  });
});
// Exporting Router
module.exports = router;
