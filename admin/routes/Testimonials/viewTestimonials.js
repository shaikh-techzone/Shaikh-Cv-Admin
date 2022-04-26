// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const testimonials = require("../../schema/addTestimonials");
// Creating Router
const router = express.Router();
// Rendering View Page
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
// Deleting Testimonials
router.get("/viewtestimonials/:id", async (req, res) => {
  let id;
  id = req.params.id;
  testimonials.findByIdAndDelete(id, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/viewtestimonials");
    }
  });
});
// Exporting Router
module.exports = router;
