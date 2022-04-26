// Importing Libraries
const express = require("express");
// Importing Schema Model
const skills = require("../../schema/addSkills");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/addskills", (req, res) => {
  res.render("Skills/addSkills", { title: "Add Skills" });
});
// Posting Data
router.post("/addskills", async (req, res) => {
  let Name, Level;
  Name = req.body.SkillName;
  Level = req.body.SkillLevel;

  const Skills = new skills({
    Name,
    Level,
  });
  await Skills.save()
    .then((result) => {
      console.log("SuccessFully Saved");
      res.redirect("/addskills");
    })
    .catch((err) => {
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
