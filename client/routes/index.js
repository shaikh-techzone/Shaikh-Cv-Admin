const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
// Importing Schemas
const service = require("../schema/addServices");
const skills = require("../schema/addSkills");
const testimonials = require("../schema/addTestimonials");
const certifications = require("../schema/addCertifications");
const education = require("../schema/addEducation");
const biodata = require("../schema/addBioData");
const experience = require("../schema/addExperience");
const social = require("../schema/addSocial");
const user = require("../schema/addClient");
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
  res.render("index", {
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

router.post("/", async (req, res) => {
  let Name, Email;
  Name = req.body.name;
  Email = req.body.email;

  const User = new user({
    Name,
    Email,
  });
  await User.save()
    .then((result) => {
      console.log("Client Details Added");
    })
    .catch((err) => {
      console.log(err);
    });

  const HOST = process.env.SMTP_HOST;
  const PORT = process.env.SMTP_PORT;
  const USER = process.env.SMTP_USER;
  const PASS = process.env.SMTP_PASS;

  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: USER,
      pass: PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `Shaikh Dev Inc. <shaikhdev.inc@gmail.com>`, // sender address
    to: "shaikhstudios.production@gmail.com", // list of receivers
    subject: "Someone has filled the contact form", // Subject line
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("SUCCESS!!");
      res.redirect("/");
    }
  });
});
module.exports = router;
