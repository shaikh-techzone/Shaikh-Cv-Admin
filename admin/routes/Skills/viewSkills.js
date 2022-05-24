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
  // Toast Initialization
  const viewskill_toast = req.flash("viewskill_toast");
  let Skills;
  await skills
    .find()
    .then((result) => {
      Skills = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Skills/viewskills", {
    title: "View Skills",
    Skills,
    viewskill_toast,
  });
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
      // Failed Toast
      viewskill_toast = {
        type: "danger",
        message: "Skill Failed To Delete!",
      };
      req.flash("viewskill_toast", viewskill_toast);
      throw err;
    } else {
      // Success Toast
      viewskill_toast = {
        type: "success",
        message: "Skill Deleted SuccessFully",
      };
      req.flash("viewskill_toast", viewskill_toast);
      await Logs.save();
      res.redirect("/admin/viewskills");
    }
  });
});
// Exporting Router
module.exports = router;
