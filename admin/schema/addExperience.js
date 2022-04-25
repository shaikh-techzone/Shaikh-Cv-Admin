const mongoose = require("mongoose");

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

const model = mongoose.model("AddExperience", AddExperience);

module.exports = model;
