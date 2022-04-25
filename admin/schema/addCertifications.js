const mongoose = require("mongoose");

const AddCertifications = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Issuer: { type: String, required: true },
    IssueDate: { type: String, required: true },
  },
  {
    collection: "Certifications",
    timestamps: true,
  }
);

const model = mongoose.model("AddCertifications", AddCertifications);

module.exports = model;
