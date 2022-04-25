const express = require("express");
const skills = require("../../schema/addSkills");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/viewskills", async (req, res) => {
  let Skills;
  await skills
    .find()
    .then((result) => {
      Skills = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Skills/viewskills", { title: "View Skills", Skills });
});

router.get("/viewskills/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let action = { _id: id };
  skills.deleteOne(action, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/viewskills");
    }
  });
});
module.exports = router;
