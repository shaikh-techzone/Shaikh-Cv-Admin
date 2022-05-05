// Importing Libraries
const mongoose = require("mongoose");
// Creating Schema
const AddLog = new mongoose.Schema(
  {
    User: { type: String, required: true },
    Action: { type: String, required: true },
  },
  {
    collection: "Logs",
    timestamps: true,
  }
);
// Creating Schema Model
const model = mongoose.model("AddLog", AddLog);
// Exporting Model
module.exports = model;
