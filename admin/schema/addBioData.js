const mongoose = require("mongoose");

const AddBioData = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Address: { type: String, required: true },
    AboutMe: { type: String, required: true },
    Phone: { type: Number, required: true },
    Degree: { type: String, required: true },
    Birthday: { type: String, required: true },
    Experience: { type: Number, required: true },
    Freelance: { type: String, required: true },
    Position: { type: String, required: true },
  },
  {
    collection: "BioData",
    timestamps: true,
  }
);

const model = mongoose.model("AddBioData", AddBioData);

module.exports = model;
