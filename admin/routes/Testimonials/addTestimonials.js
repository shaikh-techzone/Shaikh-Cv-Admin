// Importing Libraries
const express = require("express");
// Importing Schema Model
const testimonials = require("../../schema/addTestimonials");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/addtestimonials", (req, res) => {
  res.render("Testimonials/addTestimonials", { title: "Add Testimonials" });
});
// Posting Data
router.post("/addtestimonials", async (req, res) => {
  let Name, Profession, Desc;
  Name = req.body.ClientName;
  Profession = req.body.Profession;
  Desc = req.body.Review;

  const Testimonials = new testimonials({
    Name,
    Profession,
    Desc,
  });
  await Testimonials.save()
    .then((result) => {
      console.log("SuccessFully Saved");
      res.redirect("/addtestimonials");
    })
    .catch((err) => {
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
