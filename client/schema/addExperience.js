// Importing Libraries
const mongoose = require("mongoose");
// Creating Schema
const AddExperience = new mongoose.Schema(
  {
    Position: { type: String, required: true },
    Company: { type: String, required: true },
    StartYear: { type: String, required: true },
    EndYear: { type: String, required: true },
    Desc: { type: String, required: true },
  },
  {
    collection: "Experience",
    timestamps: true,
  }
);
// Creating Schema Model
const model = mongoose.model("AddExperience", AddExperience);
// Exporting Model
module.exports = model;
