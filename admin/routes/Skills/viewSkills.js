// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const skills = require("../../schema/addSkills");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/admin/viewskills", async (req, res) => {
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
router.get("/admin/viewskills/:id", async (req, res) => {
  let id;
  id = req.params.id;
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "Skill Deleted",
  });
  skills.findByIdAndDelete(id, async (err) => {
    if (err) {
      throw err;
    } else {
      await Logs.save();
      res.redirect("/admin/viewskills");
    }
  });
});
// Exporting Router
module.exports = router;
