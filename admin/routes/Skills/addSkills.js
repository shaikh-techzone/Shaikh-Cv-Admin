// Importing Libraries
const express = require("express");
// Importing Schema Model
const skills = require("../../schema/addSkills");
const Userlogs = require("../../schema/addLog");
const { requireAuth } = require("../auth");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/addskills", requireAuth, (req, res) => {
  // Toast Initialization
  const addskill_toast = req.flash("addskill_toast");
  res.render("Skills/addSkills", { title: "Add Skills", addskill_toast });
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
  const Logs = new Userlogs({
    User: "Shaikh Dev Inc.",
    Action: "Skill Added",
  });
  await Skills.save()
    .then(async (result) => {
      // Success Toast
      addskill_toast = {
        type: "success",
        message: "Skill Created Successfully!",
      };
      req.flash("addskill_toast", addskill_toast);
      await Logs.save();
      console.log("SuccessFully Saved");
      res.redirect("/addskills");
    })
    .catch((err) => {
      // Failed Toast
      addskill_toast = {
        type: "danger",
        message: "Skill Creation Failed!",
      };
      req.flash("addskill_toast", addskill_toast);

      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
