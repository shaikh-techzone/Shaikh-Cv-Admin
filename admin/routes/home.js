const express = require("express");
const mongoose = require("mongoose");
const service = require("../schema/addServices");
const skills = require("../schema/addSkills");
const testimonials = require("../schema/addTestimonials");
const certifications = require("../schema/addCertifications");
const logs = require("../schema/addLog");
const router = express.Router();

router.get("/admin/home", async (req, res) => {
  let Services, noOfServices;
  await service
    .find()
    .then(async (result) => {
      noOfServices = await service.countDocuments({});
      Services = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });

  let Skills, noOfSkills;
  await skills
    .find()
    .then(async (result) => {
      noOfSkills = await skills.countDocuments({});
      Skills = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });

  let Testimonials, noOfTestimonials;
  await testimonials
    .find()
    .then(async (result) => {
      noOfTestimonials = await testimonials.countDocuments({});
      Testimonials = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });

  let Certifications, noOfCertifications;
  await certifications
    .find()
    .then(async (result) => {
      noOfCertifications = await certifications.countDocuments({});
      Certifications = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  let Logs;
  await logs
    .find()
    .then((result) => {
      Logs = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("index", {
    title: "Home",
    Services,
    Skills,
    Testimonials,
    Certifications,
    Logs,
    noOfServices,
    noOfSkills,
    noOfCertifications,
    noOfTestimonials,
  });
});
module.exports = router;
