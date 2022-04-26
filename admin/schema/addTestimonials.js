// Importing Libraries
const mongoose = require("mongoose");
// Creating Schema
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
// Creating Schema Model
const model = mongoose.model("AddTestimonials", AddTestimonials);
// Exporting Model
module.exports = model;
