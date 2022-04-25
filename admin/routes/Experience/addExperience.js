const express = require("express");
const experience = require("../../schema/addExperience");
const router = express.Router();

router.get("/addexperience", (req, res) => {
  res.render("Experience/addExperience", { title: "Add Experience" });
});

router.post("/addexperience", async (req, res) => {
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
  await Experience.save()
    .then((result) => {
      console.log("SuccessFully Saved");
      res.redirect("/addexperience");
    })
    .catch((err) => {
      console.log("Failed to Save", err);
    });
});

module.exports = router;
