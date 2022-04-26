// Importing Libraries
const express = require("express");
// Importing Schema Model
const education = require("../../schema/addEducation");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/addeducation", (req, res) => {
  res.render("Education/addEducation", { title: "Add Education" });
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
  await Education.save()
    .then((result) => {
      console.log("SuccessFully Saved");
      res.redirect("/addeducation");
    })
    .catch((err) => {
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
