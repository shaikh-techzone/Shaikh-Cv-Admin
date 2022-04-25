const express = require("express");
const education = require("../../schema/addEducation");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/vieweducation", async (req, res) => {
  let Education;
  await education
    .find()
    .then((result) => {
      Education = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Education/vieweducation", {
    title: "View Education",
    Education,
  });
});

router.get("/vieweducation/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let action = { _id: id };
  education.deleteOne(action, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/vieweducation");
    }
  });
});
module.exports = router;
