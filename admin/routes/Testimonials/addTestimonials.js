// Importing Libraries
const express = require("express");
// Importing Schema Model
const testimonials = require("../../schema/addTestimonials");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/admin/addtestimonials", (req, res) => {
  res.render("Testimonials/addTestimonials", { title: "Add Testimonials" });
});
// Posting Data
router.post("/admin/addtestimonials", async (req, res) => {
  let Name, Profession, Desc;
  Name = req.body.ClientName;
  Profession = req.body.Profession;
  Desc = req.body.Review;

  const Testimonials = new testimonials({
    Name,
    Profession,
    Desc,
  });
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "Testimonial Added",
  });
  await Testimonials.save()
    .then(async (result) => {
      await Logs.save();
      console.log("SuccessFully Saved");
      res.redirect("/admin/addtestimonials");
    })
    .catch((err) => {
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
