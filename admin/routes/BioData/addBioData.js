const express = require("express");
const biodata = require("../../schema/addBioData");
const router = express.Router();

router.get("/addbiodata", (req, res) => {
  res.render("BioData/addBioData", { title: "Add BioData" });
});

router.post("/addbiodata", async (req, res) => {
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
  await Biodata.save()
    .then((result) => {
      console.log("SuccessFully Saved");
      res.redirect("/addbiodata");
    })
    .catch((err) => {
      console.log("Failed to Save", err);
    });
});

module.exports = router;
