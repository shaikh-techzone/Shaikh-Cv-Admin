// Importing Libraries
const mongoose = require("mongoose");
// Creating Schema
const AddEducation = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Degree: { type: String, required: true },
    From: { type: String, required: true },
    Till: { type: String, required: true },
    Subject: { type: String, required: true },
    Grade: { type: String, required: true },
  },
  {
    collection: "Education",
    timestamps: true,
  }
);
// Creating Schema Model
const model = mongoose.model("AddEducation", AddEducation);
// Exporting Model
module.exports = model;
