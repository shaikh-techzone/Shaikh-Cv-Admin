// Importing Libraries
const mongoose = require("mongoose");
// Creating Schema
const AddSocial = new mongoose.Schema(
  {
    Facebook: { type: String, required: true },
    Instagram: { type: String, required: true },
    LinkedIn: { type: String, required: true },
    Github: { type: String, required: true },
  },
  {
    collection: "Social",
    timestamps: true,
  }
);
// Creating Schema Model
const model = mongoose.model("AddSocial", AddSocial);
// Exporting Model
module.exports = model;
