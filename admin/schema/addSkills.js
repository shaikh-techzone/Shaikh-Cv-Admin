const mongoose = require("mongoose");

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

const model = mongoose.model("AddSkills", AddSkills);

module.exports = model;
