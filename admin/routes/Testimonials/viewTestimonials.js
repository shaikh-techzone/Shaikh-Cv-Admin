const express = require("express");
const testimonials = require("../../schema/addTestimonials");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/viewtestimonials", async (req, res) => {
  let Testimonials;
  await testimonials
    .find()
    .then((result) => {
      Testimonials = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Testimonials/viewtestimonials", {
    title: "View Testimonials",
    Testimonials,
  });
});

router.get("/viewtestimonials/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let action = { _id: id };
  testimonials.deleteOne(action, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/viewtestimonials");
    }
  });
});
module.exports = router;