// Importing Libraries
const mongoose = require("mongoose");
// Creating Schema
const AddClient = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
  },
  {
    collection: "Client",
    timestamps: true,
  }
);
// Creating Schema Model
const model = mongoose.model("AddClient", AddClient);
// Exporting Model
module.exports = model;
