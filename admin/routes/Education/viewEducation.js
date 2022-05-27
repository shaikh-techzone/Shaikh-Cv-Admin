// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const education = require("../../schema/addEducation");
const Userlogs = require("../../schema/addLog");
const { requireAuth } = require("../auth");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/vieweducation", requireAuth, async (req, res) => {
  // Toast Initialization
  const education_toast = req.flash("education_toast");
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
    education_toast,
  });
});
// Deleting Education
router.get("/vieweducation/:id", async (req, res) => {
  let id;
  id = req.params.id;
  const Logs = new Userlogs({
    User: "Shaikh Dev Inc.",
    Action: "Education Deleted",
  });
  education.findByIdAndDelete(id, async (err) => {
    if (err) {
      // Failed Toast
      education_toast = {
        type: "danger",
        message: "Education Failed to Delete!",
      };
      req.flash("education_toast", education_toast);
      throw err;
    } else {
      // Success Toast
      education_toast = {
        type: "success",
        message: "Education Deleted Successfully!",
      };
      req.flash("education_toast", education_toast);
      await Logs.save();
      res.redirect("/vieweducation");
    }
  });
});
// Exporting Router
module.exports = router;
