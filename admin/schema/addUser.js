// Importing Libraries
const mongoose = require("mongoose");
// Creating Schema
const AddUser = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    Role: { type: String, required: true },
  },
  {
    collection: "Admin",
    timestamps: true,
  }
);
// Creating Schema Model
const model = mongoose.model("AddUser", AddUser);
// Exporting Model
module.exports = model;
