// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const testimonials = require("../../schema/addTestimonials");
const Userlogs = require("../../schema/addLog");
const { requireAuth } = require("../auth");
// Creating Router
const router = express.Router();
// Rendering View Page
router.get("/viewtestimonials", requireAuth, async (req, res) => {
  // Toast Initialization
  const testimonial_toast = req.flash("testimonial_toast");
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
    testimonial_toast,
  });
});
// Deleting Testimonials
router.get("/viewtestimonials/:id", async (req, res) => {
  let id;
  id = req.params.id;
  const Logs = new Userlogs({
    User: "Shaikh Dev Inc.",
    Action: "Testimonial Deleted",
  });
  testimonials.findByIdAndDelete(id, async (err) => {
    if (err) {
      // Failed Toast
      testimonial_toast = {
        type: "danger",
        message: "Testimonial Failed to Delete!",
      };
      req.flash("testimonial_toast", testimonial_toast);
      throw err;
    } else {
      // Success Toast
      testimonial_toast = {
        type: "success",
        message: "Testimonial Deleted Successfully!",
      };
      req.flash("testimonial_toast", testimonial_toast);
      await Logs.save();
      res.redirect("/viewtestimonials");
    }
  });
});
// Exporting Router
module.exports = router;
