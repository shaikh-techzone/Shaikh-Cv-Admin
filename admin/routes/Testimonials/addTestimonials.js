// Importing Libraries
const express = require("express");
// Importing Schema Model
const testimonials = require("../../schema/addTestimonials");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/admin/addtestimonials", (req, res) => {
  // Toast Initialization
  const testimonial_toast = req.flash("testimonial_toast");
  res.render("Testimonials/addTestimonials", {
    title: "Add Testimonials",
    testimonial_toast,
  });
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
      // Success Toast
      testimonial_toast = {
        type: "success",
        message: "Testimonial Created Successfully!",
      };
      req.flash("testimonial_toast", testimonial_toast);
      await Logs.save();
      console.log("SuccessFully Saved");
      res.redirect("/admin/addtestimonials");
    })
    .catch((err) => {
      // Failed Toast
      testimonial_toast = {
        type: "danger",
        message: "Testimonial Creation Failed!",
      };
      req.flash("testimonial_toast", testimonial_toast);
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
