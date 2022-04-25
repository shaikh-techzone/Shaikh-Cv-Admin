const express = require("express");
const skills = require("../../schema/addSkills");
const router = express.Router();

router.get("/addskills", (req, res) => {
  res.render("Skills/addSkills", { title: "Add Skills" });
});

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

module.exports = router;
