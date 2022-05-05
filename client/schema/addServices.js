// Importing Libraries
const mongoose = require("mongoose");
// Creating Schema
const AddServices = new mongoose.Schema(
  {
    ServiceName: { type: String, required: true },
    ServiceDesc: { type: String, required: true },
  },
  {
    collection: "Services",
    timestamps: true,
  }
);
// Creating Schema Model
const model = mongoose.model("AddServices", AddServices);
// Exporting Model
module.exports = model;
