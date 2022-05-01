const express = require("express");
const mongoose = require("mongoose");
const service = require("../../schema/addServices");
const skills = require("../../schema/addSkills");
const testimonials = require("../../schema/addTestimonials");
const certifications = require("../../schema/addCertifications");
const education = require("../../schema/addEducation");
const biodata = require("../../schema/addBioData");
const experience = require("../../schema/addExperience");
const social = require("../../schema/addSocial");
const router = express.Router();

router.get("/", async (req, res) => {
  // Services
  let Services;
  await service
    .find()
    .then((result) => {
      Services = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  // Skills
  let Skills;
  await skills
    .find()
    .then((result) => {
      Skills = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  // Testimonials
  let Testimonials;
  await testimonials
    .find()
    .then((result) => {
      Testimonials = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  // Certifications
  let Certifications;
  await certifications
    .find()
    .then((result) => {
      Certifications = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  // Socials
  let Social;
  await social
    .find()
    .then((result) => {
      Social = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  // Experience
  let Experience;
  await experience
    .find()
    .then((result) => {
      Experience = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  // Education
  let Education;
  await education
    .find()
    .then((result) => {
      Education = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  // Bio Data
  let BioData;
  await biodata
    .find()
    .then((result) => {
      BioData = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("CV/index", {
    title: "Personal CV",
    Services,
    Skills,
    Testimonials,
    Certifications,
    Social,
    Education,
    Experience,
    BioData,
  });
});
module.exports = router;
