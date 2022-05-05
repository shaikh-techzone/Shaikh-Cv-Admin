// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const education = require("../../schema/addEducation");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/admin/vieweducation", async (req, res) => {
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
router.get("/admin/vieweducation/:id", async (req, res) => {
  let id;
  id = req.params.id;
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "Education Deleted",
  });
  education.findByIdAndDelete(id, async (err) => {
    if (err) {
      throw err;
    } else {
      await Logs.save();
      res.redirect("/admin/vieweducation");
    }
  });
});
// Exporting Router
module.exports = router;
