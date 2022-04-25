const mongoose = require("mongoose");

const AddTestimonials = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Profession: { type: String, required: true },
    Desc: { type: String, required: true },
  },
  {
    collection: "Testimonials",
    timestamps: true,
  }
);

const model = mongoose.model("AddTestimonials", AddTestimonials);

module.exports = model;
