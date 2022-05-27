// Importing Libraries
const express = require("express");
// Importing Schema Model
const education = require("../../schema/addEducation");
const Userlogs = require("../../schema/addLog");
const { requireAuth } = require("../auth");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/addeducation", requireAuth, (req, res) => {
  // Toast Initialization
  const education_toast = req.flash("education_toast");
  res.render("Education/addEducation", {
    title: "Add Education",
    education_toast,
  });
});
// Posting Data
router.post("/addeducation", async (req, res) => {
  let Name, Degree, From, Till, Subject, Grade;
  Name = req.body.InstituteName;
  Degree = req.body.Degree;
  From = req.body.StartDate;
  Till = req.body.EndDate;
  Subject = req.body.FieldofStudy;
  Grade = req.body.Grade;

  const Education = new education({
    Name,
    Degree,
    From,
    Till,
    Subject,
    Grade,
  });
  const Logs = new Userlogs({
    User: "Shaikh Dev Inc.",
    Action: "Education Added",
  });
  await Education.save()
    .then(async (result) => {
      // Success Toast
      education_toast = {
        type: "success",
        message: "Education Created Successfully!",
      };
      req.flash("education_toast", education_toast);
      await Logs.save();
      console.log("SuccessFully Saved");
      res.redirect("/addeducation");
    })
    .catch((err) => {
      // Failed Toast
      education_toast = {
        type: "danger",
        message: "Education Creation Failed!",
      };
      req.flash("education_toast", education_toast);
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
