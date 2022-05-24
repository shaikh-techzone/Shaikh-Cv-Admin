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
  // Toast Initialization
  const experience_toast = req.flash("experience_toast");
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
    experience_toast,
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
      // Failed Toast
      experience_toast = {
        type: "danger",
        message: "Experience Failed to Delete!",
      };
      req.flash("experience_toast", experience_toast);
      throw err;
    } else {
      // Success Toast
      experience_toast = {
        type: "success",
        message: "Experience Deleted Successfully!",
      };
      req.flash("experience_toast", experience_toast);
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
      // Success Toast
      experience_toast = {
        type: "success",
        message: "Experience Updated Successfully!",
      };
      req.flash("experience_toast", experience_toast);
      await Logs.save();
      updateexperience = result;
      console.log("Updated");
      res.redirect("/admin/viewexperience");
    })
    .catch((err) => {
      // Failed Toast
      experience_toast = {
        type: "danger",
        message: "Experience Failed To Update!",
      };
      req.flash("experience_toast", experience_toast);
      console.log(`Error`);
    });
});
// Exporting Router
module.exports = router;
