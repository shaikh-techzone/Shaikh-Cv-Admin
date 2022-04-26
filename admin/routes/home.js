const express = require("express");
const mongoose = require("mongoose");
const service = require("../schema/addServices");
const skills = require("../schema/addSkills");
const testimonials = require("../schema/addTestimonials");
const certifications = require("../schema/addCertifications");
const router = express.Router();

router.get("/home", async (req, res) => {
  let services;
  await service
    .find()
    .then((result) => {
      services = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });

  let Skills;
  await skills
    .find()
    .then((result) => {
      Skills = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });

  let Testimonials;
  await testimonials
    .find()
    .then((result) => {
      Testimonials = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });

  let Certifications;
  await certifications
    .find()
    .then((result) => {
      Certifications = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("index", {
    title: "Home",
    services,
    Skills,
    Testimonials,
    Certifications,
  });
});
module.exports = router;
