// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const testimonials = require("../../schema/addTestimonials");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/admin/viewtestimonials", async (req, res) => {
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
router.get("/admin/viewtestimonials/:id", async (req, res) => {
  let id;
  id = req.params.id;
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "Testimonial Deleted",
  });
  testimonials.findByIdAndDelete(id, async (err) => {
    if (err) {
      throw err;
    } else {
      await Logs.save();
      res.redirect("/admin/viewtestimonials");
    }
  });
});
// Exporting Router
module.exports = router;
