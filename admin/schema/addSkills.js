// Importing Libraries
const mongoose = require("mongoose");
// Creating Schema
const AddSkills = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Level: { type: Number, required: true },
  },
  {
    collection: "Skills",
    timestamps: true,
  }
);
// Creating Schema Model
const model = mongoose.model("AddSkills", AddSkills);
// Exporting Model
module.exports = model;
