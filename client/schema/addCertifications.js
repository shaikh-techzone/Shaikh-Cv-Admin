// Importing Libraries
const mongoose = require("mongoose");
// Creating Schema
const AddCertifications = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Issuer: { type: String, required: true },
    IssueYear: { type: String, required: true },
    Desc: { type: String, required: true },
  },
  {
    collection: "Certifications",
    timestamps: true,
  }
);
// Creating Schema Model
const model = mongoose.model("AddCertifications", AddCertifications);
// Exporting Model
module.exports = model;
