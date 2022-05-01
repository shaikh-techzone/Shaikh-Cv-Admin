// Importing Libraries
const express = require("express");
// Importing Schema Model
const skills = require("../../schema/addSkills");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/admin/addskills", (req, res) => {
  res.render("Skills/addSkills", { title: "Add Skills" });
});
// Posting Data
router.post("/admin/addskills", async (req, res) => {
  let Name, Level;
  Name = req.body.SkillName;
  Level = req.body.SkillLevel;

  const Skills = new skills({
    Name,
    Level,
  });
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "Skill Added",
  });
  await Skills.save()
    .then(async (result) => {
      await Logs.save();
      console.log("SuccessFully Saved");
      res.redirect("/admin/addskills");
    })
    .catch((err) => {
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
