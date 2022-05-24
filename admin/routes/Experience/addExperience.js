// Importing Libraries
const express = require("express");
// Importing Schema Model
const experience = require("../../schema/addExperience");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/admin/addexperience", (req, res) => {
  // Toast Initialization
  const experience_toast = req.flash("experience_toast");
  res.render("Experience/addExperience", {
    title: "Add Experience",
    experience_toast,
  });
});
// Posting Data
router.post("/admin/addexperience", async (req, res) => {
  let Position, Company, StartYear, EndYear, Desc;
  Position = req.body.Occupation;
  Company = req.body.Company;
  StartYear = req.body.StartYear;
  EndYear = req.body.EndYear;
  Desc = req.body.Desc;

  const Experience = new experience({
    Position,
    Company,
    StartYear,
    EndYear,
    Desc,
  });
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "Experience Added",
  });
  await Experience.save()
    .then(async (result) => {
      // Success Toast
      experience_toast = {
        type: "success",
        message: "Experience Created Successfully!",
      };
      req.flash("experience_toast", experience_toast);
      await Logs.save();
      console.log("SuccessFully Saved");
      res.redirect("/admin/addexperience");
    })
    .catch((err) => {
      // Failed Toast
      experience_toast = {
        type: "danger",
        message: "Experience Creation Failed!",
      };
      req.flash("experience_toast", experience_toast);

      console.log("Failed to Save", err);
    });
});
// Exporting Router
module.exports = router;
