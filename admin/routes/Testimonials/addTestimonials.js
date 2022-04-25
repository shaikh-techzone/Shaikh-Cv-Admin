const express = require("express");
const testimonials = require("../../schema/addTestimonials");
const router = express.Router();

router.get("/addtestimonials", (req, res) => {
  res.render("Testimonials/addTestimonials", { title: "Add Testimonials" });
});

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

module.exports = router;
