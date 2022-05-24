// Importing Libraries
const express = require("express");
// Importing Schema Model
const biodata = require("../../schema/addBioData");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/admin/addbiodata", async (req, res) => {
  // Toast Initialization
  const bio_toast = req.flash("bio_toast");
  let Biodata;
  await biodata
    .find()
    .then((result) => {
      Biodata = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("BioData/addBioData", {
    title: "Add BioData",
    Biodata,
    bio_toast,
  });
});
// Posting Data
router.post("/admin/addbiodata", async (req, res) => {
  let User, Action;
  User = "Shaikh Admin";
  let Name,
    Email,
    Address,
    AboutMe,
    Phone,
    Degree,
    Birthday,
    Experience,
    Freelance,
    Position;
  Name = req.body.MyName;
  Email = req.body.Email;
  Address = req.body.Address;
  AboutMe = req.body.About;
  Phone = req.body.Phone;
  Degree = req.body.Degree;
  Birthday = req.body.Birthday;
  Experience = req.body.Experience;
  Freelance = req.body.Freelance;
  Position = req.body.Position;

  const Biodata = new biodata({
    Name,
    Email,
    Address,
    AboutMe,
    Phone,
    Degree,
    Birthday,
    Experience,
    Freelance,
    Position,
  });
  const Logs = new Userlogs({
    User,
    Action: "BioData Added",
  });
  await Biodata.save()
    .then(async (result) => {
      // Success Toast
      bio_toast = {
        type: "success",
        message: "Biodata Created Successfully!",
      };
      req.flash("bio_toast", bio_toast);
      await Logs.save();
      console.log("SuccessFully Saved");
      res.redirect("/admin/addbiodata");
    })
    .catch((err) => {
      // Failed Toast
      bio_toast = {
        type: "danger",
        message: "Biodata Creation Failed!",
      };
      req.flash("bio_toast", bio_toast);

      console.log("Failed to Save", err);
    });
});
// Exporting Router
module.exports = router;
